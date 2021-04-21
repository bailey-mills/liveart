// Manage all interactions with the databases to prepare data.

using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Windows.Forms;
using System.Reflection;

namespace DataGenerator
{
	class Database
	{
		public static string DB_NONE = "N/A";
		public static string DB_NULL = "NULL";
		public static string DB_EMPTY = "Empty string";
		public static string DB_CUSTOM = "Custom";

		public static string DB_MAIN = "LIVEART";
		public static string DB_SAMPLES = "liveart_dg";

		public static string FORMAT_STRING = "String";
		public static string FORMAT_NUMBER = "Number";

		public static int COL_WIDTH = 100;

		/*
			METHOD: GetConnectionString()
			PARAMETERS: ---
			RETURN: string: the connection string
			DESCRIPTION: Returns the connection string from the config file
		*/
		public static string GetConnectionString(string type)
		{
			// Assume failure.
			string returnValue = null;

			// Look for the name in the connectionStrings section.
			ConnectionStringSettings settings = ConfigurationManager.ConnectionStrings[type];

			// If found, return the connection string.
			if (settings != null)
			{
				returnValue = settings.ConnectionString;
			}
			else
			{
				Console.WriteLine("Connection string unavailable.");
			}

			return returnValue;
		}
		
		public static void SetupTable(DataGridView dgv, string database, string table)
		{
			List<string> schema = GetColumns(database, table);

			// Reset table
			dgv.Columns.Clear();

			foreach (string col in schema)
			{
				DataGridViewComboBoxColumn combo = new DataGridViewComboBoxColumn();
				combo.HeaderText = col;
				combo.Width = COL_WIDTH;
				dgv.Columns.Add(combo);
			}

			dgv.Rows.Add();
			dgv.Rows.Add();
			dgv.Rows.Add();
			dgv.Rows.Add();

			dgv.RowHeadersVisible = false;
		}

		public static List<string> GetColumns(string database, string table)
		{
			List<string> items = new List<string>();

			// Setup query (this will return the column names needed for the table)
			string getQuery = "USE " + database + "; SELECT TOP 0 * FROM [dbo].[" + table + "]";

			// Setup UI with the chosen table
			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					using (var command = new SqlCommand(getQuery, conn))
					{
						conn.Open();
						SqlDataReader reader = command.ExecuteReader(CommandBehavior.SchemaOnly);
						DataTable schema = reader.GetSchemaTable();

						foreach (DataRow rowcol in schema.Rows)
						{
							items.Add(rowcol.Field<string>("ColumnName"));
						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			return items;
		}

		public static List<string> GetTables(string database)
		{
			List<string> tables = new List<string>();
			string query = "USE [" + database + "]; SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE = 'BASE TABLE'";

			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					using (var command = new SqlCommand(query, conn))
					{
						conn.Open();
						SqlDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							string table = reader["TABLE_NAME"].ToString();
							tables.Add(table);
						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			return tables;
		}

		public static List<string> GetSourceDatabases()
		{
			List<string> items = new List<string>();

			items.Add(DB_NONE);
			items.Add(DB_NULL);
			items.Add(DB_EMPTY);
			items.Add(DB_CUSTOM);

			var connectionStrings = ConfigurationManager.ConnectionStrings;
			foreach (ConnectionStringSettings connectionString in connectionStrings)
			{
				if (connectionString.Name != "LocalSqlServer")
				{
					items.Add(connectionString.Name);
				}
			}

			return items;
		}

		public static List<string> GetSourceTables(string database)
		{
			List<string> tables = new List<string>();

			if (database == DB_CUSTOM)
			{
				tables = CustomGenerator.GetMethods();
			}
			else if (database != DB_NONE && database != DB_NULL && database != DB_EMPTY)
			{
				tables = GetTables(database);
			}

			return tables;
		}

		public static string GenerateQuery(DataGridView dgv, int count, string database, string table)
		{
			// Sample Output: "USE liveart_db; INSERT INTO Person VALUES ('Bailey', 'Mills', 'A1A1A1', 0);"
			bool valid = true;

			// Prepare data from datagridview
			List<List<string>> items = new List<List<string>>();
			List<Summary> data = new List<Summary>();
			// Loop through all columns
			for (int i = 0; i < dgv.Columns.Count; i++)
			{
				string sDatabase = "";
				string sTable = "";
				string sColumn = "";
				string sFormat = "";

				// Pull data from each row of the current column
				var _database = dgv.Rows[0].Cells[i].Value;
				var _table = dgv.Rows[1].Cells[i].Value;
				var _column = dgv.Rows[2].Cells[i].Value;
				var _format = dgv.Rows[3].Cells[i].Value;

				// Conver to string if possible
				if (_database != null)
				{
					sDatabase = _database.ToString();
				}
				if (_table != null)
				{
					sTable = _table.ToString();
				}
				if (_column != null)
				{
					sColumn = _column.ToString();
				}
				if (_format != null)
				{
					sFormat = _format.ToString();
				}

				data.Add(new Summary(sDatabase, sTable, sColumn, sFormat));
			}

			// Loop through the columns of the dgv and query the db for sample data
			foreach (Summary col in data)
			{
				List<string> currResults = new List<string>();
				
				if (col.valid)
				{
					if (col.customQuery)
					{
						CustomGenerator cg = new CustomGenerator();
						MethodInfo method = cg.GetType().GetMethod(col.table);
						currResults = (List<string>)method.Invoke(cg, new object[] { count });
					}
					else if (!col.runQuery)
					{
						if (col.includeValue)
						{
							for (int i = 0; i < count; i++)
							{
								currResults.Add(col.column);
							}
						}
					}
					else
					{
						currResults = GetRows(count, col.database, col.table, col.column, col.format);
					}

					// Add the current item to the list of items
					items.Add(currResults);
				}
				else
				{
					valid = false;
					break;
				}
			}

			return PrepareOutputReverse(count, database, table, items, valid);
		}

		public static List<string> GetRows(int count, string database, string table, string column, string format)
		{
			List<string> currResults = new List<string>();

			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					string query = "dbo.GetRows";
					using (var command = new SqlCommand(query, conn))
					{
						conn.Open();
						command.CommandType = CommandType.StoredProcedure;
						command.Parameters.Add(new SqlParameter("@Requests", count));
						command.Parameters.Add(new SqlParameter("@SampleRows", GetSampleRows(database, table)));
						command.Parameters.Add(new SqlParameter("@Table", table));
						command.Parameters.Add(new SqlParameter("@Column", column));

						SqlDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							string curr = reader["Value"].ToString();

							if (format == FORMAT_STRING)
							{
								curr = string.Format("'{0}'", curr);
							}
							currResults.Add(curr);
						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			return currResults;
		}



		public static List<List<string>> GetRows(int count, string database, string table, string[] columns, string whereClause = "")
		{
			List<List<string>> results = new List<List<string>>();
			
			// Create list groups
			for (int i = 0; i < columns.Count(); i++)
			{
				results.Add(new List<string>());
			}

			int sampleRows = GetSampleRows(database, table);
			int loops = count / sampleRows;
			int extra = count % sampleRows;

			if (extra != 0)
			{
				loops++;
			}

			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					int i = 0;
					int currCount = 0;
					while (i < loops)
					{
						currCount = sampleRows;
						if (extra != 0 && i == loops - 1)
						{
							currCount = extra;
						}

						string query = string.Format("USE [{0}]; SELECT TOP ({1}) {2} FROM [{3}] {4} ORDER BY NEWID();",
							database, currCount, string.Join(",", columns), table, whereClause);

						using (var command = new SqlCommand(query, conn))
						{
							conn.Open();
							SqlDataReader reader = command.ExecuteReader();
							while (reader.Read())
							{
								for (int j = 0; j < columns.Count(); j++)
								{
									results[j].Add(reader[j].ToString());
								}
							}
							conn.Close();
						}
						i++;
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			return results;
		}

		public static int GetSampleRows(string database, string table)
		{
			int count = -1;

			string query = "USE [" + database + "]; SELECT COUNT(*) FROM [dbo].[" + table + "]";

			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					using (var command = new SqlCommand(query, conn))
					{
						conn.Open();
						count = (int) command.ExecuteScalar();
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			return count;
		}

		static string PrepareOutputReverse(int count, string database, string table, List<List<string>> items, bool valid)
		{
			// Loop through all requested rows and format them into queries
			string output = "USE " + database + ";\n";
			if (valid)
			{
				for (int i = 0; i < count; i++)
				{
					string line = string.Format("INSERT INTO [dbo].[{0}] VALUES (", table);
					for (int j = 0; j < items.Count; j++)
					{
						if (items[j].Count == count)
						{
							line += items[j][i] + ",";
						}
					}
					line = line.Remove(line.Length - 1);
					line += ");\n";
					output += line;
				}
			}
			else
			{
				output = null;
				MessageBox.Show("ERROR: Invalid Input");
			}

			return output;
		}

		static string PrepareOutput(int count, string table, List<List<string>> items, bool[] asString)
		{
			string result = "\n";

			for (int i = 0; i < count; i++)
			{
				string line = string.Format("INSERT INTO [dbo].[{0}] VALUES (", table);
				for (int j = 0; j < items.Count; j++)
				{
					if (items[j].Count == count)
					{
						string item = items[j][i];

						// Fix ' messing up format of string (ex. St. John's)
						item = item.Replace("'", "''");

						if (asString[j])
						{
							item = string.Format("'{0}'", item);
						}
						line += item + ",";
					}
				}
				line = line.Remove(line.Length - 1);
				line += ");\n";
				result += line;
			}

			return result;
		}

		static string PrepareOutputTags(string table, List<List<string>> tagGroupList, int startID)
		{
			List<List<string>> formattedGroup = new List<List<string>>();
			List<string> tagIDs = new List<string>();
			List<string> objectIDs = new List<string>();

			int count = 0;
			for (int i = 0; i < tagGroupList.Count; i++)
			{
				for (int j = 0; j < tagGroupList[i].Count; j++)
				{
					tagIDs.Add(tagGroupList[i][j]);
					objectIDs.Add((startID + i).ToString());
					count++;
				}
			}

			formattedGroup.Add(tagIDs);
			formattedGroup.Add(objectIDs);

			return PrepareOutput(count, table, formattedGroup, new bool[] { false, false });
		}

		public static string GenerateEvents(int count, string database)
		{
			string result = "USE " + database + ";\n";
			int startProductID = GetAutoIncrementID(database, "Product");
			int startEventID = GetAutoIncrementID(database, "Event");

			if (startProductID < 0)
			{
				startProductID = 1;
			}
			if (startEventID < 0)
			{
				startEventID = 1;
			}

			// Container for different tables / insert statement groups
			// List of users (sellers)
			List<string> sellerIDs = Database.GetRows(count, Database.DB_MAIN, "User", "ID", Database.FORMAT_NUMBER);

			// Product
			List<List<string>> products = CustomGenerator.GetProducts(count, sellerIDs, startEventID, startProductID);
			List<string> categoryIDsEvent = Database.GetRows(count, Database.DB_MAIN, "Category", "ID", Database.FORMAT_NUMBER);

			// Loop through and create a categoryID for each product set
			// (one item for each product, needed so that events have the same product types, ex. (1, 1, 5, 3, 3, 3, 2, 2))
			List<string> categoryIDsProduct = new List<string>();
			List<string> currentBiddingIDs = new List<string>();
			int j = 0;
			string prevEventID = "";
			for (int i = 0; i < products[0].Count(); i++)
			{
				string currEventID = products[5][i];

				if (i != 0 && prevEventID != currEventID)
				{
					j++;
				}
				
				// Track first product in each event
				if (prevEventID != currEventID)
				{
					currentBiddingIDs.Add((i + startProductID).ToString());
				}

				categoryIDsProduct.Add(categoryIDsEvent[j]);
				prevEventID = currEventID;
			}
			List<List<string>> productTags = CustomGenerator.GetTags(products[0].Count(), 1, categoryIDsProduct);

			List<string> productsFirstTagID = new List<string>();
			for (int i = 0; i < productTags.Count(); i++)
			{
				productsFirstTagID.Add(productTags[i][0]);
			}

			// Event
			List<List<string>> events = CustomGenerator.GetEvents(count, currentBiddingIDs, categoryIDsEvent);

			// Update products to have the correct images
			List<string> productImages = CustomGenerator.GetRowsByFilterID(products[0].Count(), productsFirstTagID, DB_SAMPLES, "ProductImages", "Value", "TagID", "Tag");
			products.Insert(3, productImages);

			// Set the event image to the first product image
			List<string> eventImages = new List<string>();
			prevEventID = "";
			for (int i = 0; i < products[0].Count(); i++)
			{
				string currEventID = products[6][i];

				// Track first product in each event
				if (prevEventID != currEventID)
				{
					eventImages.Add(products[3][i]);
				}

				prevEventID = currEventID;
			}
			events.Insert(4, eventImages);

			// Product to Events
			List<List<string>> productsToEvents = new List<List<string>>();
			List<string> eventIDs = products[products.Count() - 2];
			List<string> productIDs = products[products.Count() - 1];
			productsToEvents.Add(eventIDs);
			productsToEvents.Add(productIDs);

			// Seller to Events
			List<List<string>> sellerToEvents = new List<List<string>>();
			List<string> sellerToEventEventIDs = new List<string>();
			for (int i = 0; i < count; i++)
			{
				string eventIDSingle = (i + startEventID).ToString();
				sellerToEventEventIDs.Add(eventIDSingle);
			}
			sellerToEvents.Add(sellerIDs);
			sellerToEvents.Add(sellerToEventEventIDs);


			// Remove temporary data holders (productId, eventId)
			products.RemoveAt(products.Count() - 1);
			products.RemoveAt(products.Count() - 1);

			// Format lists into query statements
			int fullCount = products[0].Count();
			result += PrepareOutput(fullCount, "Product", products, new bool[] { true, false, true, true, false, false });
			result += PrepareOutput(count, "Event", events, new bool[] { true, true, true, true, true, false, false });
			//result += PrepareOutputTags("ProductToTag", productTags, startProductID);
			//result += PrepareOutput(fullCount, "ProductToEvent", productsToEvents, new bool[] { false, false });
			//result += PrepareOutput(count, "SellerToEvent", sellerToEvents, new bool[] { false, false });

			//result += CompactQueries("Product", products.ToArray(), new bool[] { true, false, true, true, false, false });
			//result += CompactQueries("Event", events.ToArray(), new bool[] { true, true, true, true, true, false });
			result += PrepareOutputTags("ProductToTag", productTags, startProductID);
			result += CompactQueries("ProductToEvent", productsToEvents.ToArray(), new bool[] { false, false });
			result += CompactQueries("SellerToEvent", sellerToEvents.ToArray(), new bool[] { false, false });

			return result;
		}

		public static string GenerateUsers(int count, string database)
		{
			string result = "USE " + database + ";\n";
			int startAddressID = GetAutoIncrementID(database, "Address");
			int startUserID = GetAutoIncrementID(database, "User");

			if (startAddressID < 0)
			{
				startAddressID = 1;
			}
			if (startUserID < 0)
			{
				startUserID = 1;
			}

			// Container for different tables / insert statement groups
			List<List<string>> addresses = CustomGenerator.GetAddresses(count);
			List<List<string>> users = CustomGenerator.GetUsers(count, startAddressID);
			List<string> categoryIDs = Database.GetRows(count, Database.DB_MAIN, "Category", "ID", Database.FORMAT_NUMBER);
			List<List<string>> userTags = CustomGenerator.GetTags(count, 4, categoryIDs);

			// Format lists into query statements
			result += PrepareOutput(count, "Address", addresses, new bool[] { true, true, false, true });
			result += PrepareOutput(count, "User", users, new bool[] { false, true, true, true, true, true });
			result += PrepareOutputTags("UserToTag", userTags, startUserID);

			//result += CompactQueries("Address", addresses.ToArray(), new bool[] { true, true, false, true });
			//result += CompactQueries("User", users.ToArray(), new bool[] { false, true, true, true, true, true });
			//result += PrepareOutputTags("UserToTag", userTags, startUserID);

			return result;
		}

		static int GetAutoIncrementID(string database, string table)
		{
			string query = "USE [" + database + "]; SELECT IDENT_CURRENT('" + table + "');";
			int id = -1;

			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					using (var command = new SqlCommand(query, conn))
					{
						conn.Open();
						id = int.Parse(command.ExecuteScalar().ToString());

						if (id > 1)
						{
							id++;
						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			return id;
		}

		public static string GenerateSubscribers(int count, string database)
		{
			// Prepare output statement
			StringBuilder sb = new StringBuilder();
			sb.Append("USE " + database + ";\n\n");

			// Select the count of events for every user that has at least one event
			/*
			SELECT U.ID, COUNT(*) AS 'Count' FROM Product P
				JOIN [dbo].ProductToEvent PE ON PE.ProductID = P.ID
				JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID
				JOIN [dbo].[User] U ON U.ID = SE.UserID
				GROUP BY U.ID
			*/
			string productCountQuery = "SELECT U.ID, COUNT(*) AS 'Count' FROM Product P JOIN [dbo].ProductToEvent PE ON PE.ProductID = P.ID " +
				"JOIN [dbo].[SellerToEvent] SE ON SE.EventID = PE.EventID JOIN [dbo].[User] U ON U.ID = SE.UserID GROUP BY U.ID";

			Random r = new Random();

			List<string> targetIDs = new List<string>();
			List<int> targetFollowerCount = new List<int>();
			int sum = 0;

			List<string> bigUserList = new List<string>();
			List<string> bigTargetUserList = new List<string>();

			// Generate {count} subscriptions for each event +- 50%
			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					// Get target data
					using (var command = new SqlCommand(productCountQuery, conn))
					{
						conn.Open();
						SqlDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							// Get user info
							string id = reader["ID"].ToString();
							string productCount = reader["Count"].ToString();

							// Get a random scale
							int followers = (int)(r.NextDouble() * (double)count * Double.Parse(productCount));

							// Store the data
							targetIDs.Add(id);
							targetFollowerCount.Add(followers);
							sum += followers;
						}
					}

					// Generate insert statements
					for (int i = 0; i < targetIDs.Count; i++)
					{
						if (targetFollowerCount[i] > 0)
						{
							// Get users that will follow
							List<string> userList = GetRows(targetFollowerCount[i], Database.DB_MAIN, "User", "ID", Database.FORMAT_NUMBER);

							for (int j = 0; j < userList.Count; j++)
							{
								bigUserList.Add(userList[j]);
								bigTargetUserList.Add(targetIDs[i]);
							}
							// Write line
							/*
							for (int j = 0; j < userList.Count; j++)
							{
								string userID = userList[j];
								string targetUserID = targetIDs[i];

								
								//IF NOT EXISTS(SELECT 1 FROM [dbo].[Subscription] WHERE UserID = {0} AND TargetUserID = {1})
								//	INSERT INTO [dbo].[Subscription] VALUES ({0}, {1})\n
								
								
								//sb.Append(string.Format("IF NOT EXISTS(SELECT 1 FROM [dbo].[Subscription] WHERE UserID = {0} AND TargetUserID = {1})\n\tINSERT INTO [dbo].[Subscription] VALUES ({0}, {1})\n", userID, targetUserID));
								
								//sb.Append("IF NOT EXISTS(SELECT 1 FROM [dbo].[Subscription] WHERE UserID = ");
								//sb.Append(userID);
								//sb.Append(" AND TargetUserID = ");
								//sb.Append(targetUserID);
								//sb.Append(")\n\t");
								//sb.Append("INSERT INTO [dbo].[Subscription] VALUES (");
								//sb.Append(userID);
								//sb.Append(",");
								//sb.Append(targetUserID);
								//sb.Append(");\n");
							}*/

						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			// Generate script compactly
			sb.Append(CompactQueries("Subscription", new List<string>[] { bigUserList, bigTargetUserList }, new bool[] { false, false }));

			return sb.ToString();
		}

		public static string CompactQueries(string table, List<string>[] columns, bool[] isString)
		{
			const int max = 1000;
			int count = columns[0].Count();
			int loops = count / max;
			int extra = count % max;

			if (extra != 0)
			{
				loops++;
			}
			
			int i = 0;
			int currCount;

			StringBuilder sb = new StringBuilder();

			while (i < loops)
			{
				currCount = 1000;
				if (extra != 0 && i == loops - 1)
				{
					currCount = extra;
				}

				sb.Append(string.Format("INSERT INTO [{0}] VALUES ", table));
				for (int j = 0; j < currCount; j++)
				{
					sb.Append("(");
					for (int k = 0; k < columns.Count(); k++)
					{
						string value = columns[k][j + (i * max)];

						if (isString[k])
						{
							sb.Append(string.Format("'{0}'", value));
						}
						else
						{
							sb.Append(string.Format("{0}", value));
						}

						if (k + 1 < columns.Count())
						{
							sb.Append(",");
						}
					}
					sb.Append(")");
					if (j + 1 < currCount)
					{
						sb.Append(",");
					}
				}
				sb.Append(";\n");
				i++;
			}

			return sb.ToString();
		}

		public static string GenerateBids(int count, string database)
		{
			// Prepare output statement
			string result = "USE " + database + ";\n\n";
			result += "ALTER TABLE [Transaction] DROP CONSTRAINT [FK_Transaction_BidID]\n\n";

			// Store event query data
			List<string> eventIDs = new List<string>();
			List<string> productIDs = new List<string>();
			List<string> categoryIDs = new List<string>();
			List<string> basePrices = new List<string>();
			List<string> startTimes = new List<string>();
			int sum = 0;

			// Get current time to update events before now
			DateTime now = DateTime.Now;

			// Get all events that happened in the past (ProductID, EventID, CategoryID)
			string eventQuery = string.Format("USE [{0}]; SELECT PE.EventID, PE.ProductID, E.CategoryID, P.BasePrice, E.StartTime FROM [dbo].[Event] E JOIN [ProductToEvent] PE ON PE.EventID = E.ID JOIN [Product] P ON P.ID = PE.ProductID WHERE E.StartTime < '{1}' AND P.IsSold = '0';", database, now.ToString());
			using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[database].ConnectionString))
			{
				try
				{
					using (var command = new SqlCommand(eventQuery, conn))
					{
						conn.Open();
						SqlDataReader reader = command.ExecuteReader();
						while (reader.Read())
						{
							// Get user info
							string eventID = reader["EventID"].ToString();
							string productID = reader["ProductID"].ToString();
							string categoryID = reader["CategoryID"].ToString();
							string basePrice = reader["BasePrice"].ToString();
							string startTime = reader["StartTime"].ToString();

							// Store the data
							eventIDs.Add(eventID);
							productIDs.Add(productID);
							categoryIDs.Add(categoryID);
							basePrices.Add(basePrice);
							startTimes.Add(startTime);

							sum++;
						}
					}
				}
				catch (Exception ex)
				{
					Console.WriteLine(ex.Message);
				}
				finally
				{
					conn.Close();
				}
			}

			// Get the starting ID for the bids when creating transactions
			int startBidID = GetAutoIncrementID(database, "Bid");
			if (startBidID < 0)
			{
				startBidID = 1;
			}


			// Loop through all the events that need bids/transactions
			Random r = new Random();
			int totalBids = 0;
			DateTime prevTime = DateTime.Now;
			string prevEventID = "";
			for (int i = 0; i < sum; i++)
			{
				// Get {count} users who have a tag with the same category ID for each event
				List<string> bidders = GetRows(count, Database.DB_MAIN, "User", new string[] {"U.ID"}, "U JOIN [UserToTag] UT ON UT.UserID = U.ID JOIN [Tag] T ON T.ID = UT.TagID WHERE T.CategoryID = " + categoryIDs[i])[0];

				// Generate a random number of bids per product
				int maxBids = r.Next(3, 7);
				int bidCount = 0;
				int prevBidderIndex = -1;
				float currBid = float.Parse(basePrices[i]);
				DateTime currTime = DateTime.Parse(startTimes[i]);
				if (prevEventID == eventIDs[i])
				{
					currTime = prevTime.AddSeconds(r.Next(40, 120));
				}
				float basePrice = currBid;

				// If there's only one bidder, don't let them bid against themselves
				if (count <= 1)
				{
					maxBids = 1;
				}

				while (bidCount < maxBids)
				{
					// Choose a random bidder
					int bidderIndex = r.Next(0, count);

					// If the bid isn't against themself, 'calculate' their bid
					if (bidderIndex != prevBidderIndex)
					{
						// Add an amount to the price (based on the base price)
						if (bidCount != 0)
						{
							float increase = (float)r.Next(50, 100) / 100 * basePrice * 0.2f;
							currBid += (int)increase;
						}

						// Add add some seconds to the current time
						currTime = currTime.AddSeconds(r.Next(4, 46));

						// Create the bid
						string bidLine = string.Format("INSERT INTO [Bid] VALUES ({0}, {1}, {2}, {3}, '{4}')\n", 
							productIDs[i], eventIDs[i], bidders[bidderIndex], currBid, currTime.ToString());

						result += bidLine;

						bidCount++;
					}

					prevBidderIndex = bidderIndex;
				}

				// Save the number of bids the generator has written
				totalBids += maxBids;

				// Create the transaction
				string transactionLine = string.Format("INSERT INTO [Transaction] VALUES ({0})\n\n", totalBids - 1 + startBidID);
				result += transactionLine;

				// Save the current event ID, so that if there's another product in this event,
				//	the starttime is based on how long the previous product took
				prevTime = currTime;
				prevEventID = eventIDs[i];
			}

			result += "ALTER TABLE dbo.[Transaction] WITH CHECK ADD CONSTRAINT [FK_Transaction_BidID] FOREIGN KEY(BidID) REFERENCES dbo.[Bid] (ID)\n\n";

			// Update all products to IsSold = 1
			/*
			UPDATE P
				SET IsSold = '1'
				FROM [Product] P
				JOIN [ProductToEvent] PE ON PE.ProductID = P.ID
				JOIN [Event] E ON E.ID = PE.EventID
				WHERE E.StartTime < GETDATE(); 
			*/
			string queryIsSold = string.Format("UPDATE P\n\tSET IsSold = '1'\n\tFROM [Product] P\n\tJOIN [ProductToEvent] PE ON PE.ProductID = P.ID\n\tJOIN [Event] E ON E.ID = PE.EventID\n\tWHERE E.StartTime < '{0}';", now.ToString());
			result += queryIsSold;

			return result;
		}
	}
}
