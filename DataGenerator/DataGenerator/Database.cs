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



		public static List<List<string>> GetRows(int count, string database, string table, string[] columns)
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

						string query = string.Format("USE [{0}]; SELECT TOP ({1}) {2} FROM {3} ORDER BY NEWID();",
							database, currCount, string.Join(",", columns), table);

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

			return results;
		}

		private static int GetSampleRows(string database, string table)
		{
			int count = -1;

			string query = "USE [" + database + "]; SELECT COUNT(*) FROM [" + table + "]";

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
			List<List<string>> productTags = CustomGenerator.GetTags(products[0].Count());

			// Event
			List<List<string>> events = CustomGenerator.GetEvents(count);

			// Product to Events
			List<List<string>> productsToEvents = new List<List<string>>();
			List<string> eventIDs = products[products.Count() - 2];
			List<string> productIDs = products[products.Count() - 1];
			productsToEvents.Add(eventIDs);
			productsToEvents.Add(productIDs);

			// Seller to Events
			List<List<string>> sellerToEvents = new List<List<string>>();
			List<string> userIDs = products[1];
			sellerToEvents.Add(userIDs);
			sellerToEvents.Add(eventIDs);


			// Remove temporary data holders (productId, eventId)
			products.RemoveAt(products.Count() - 1);
			products.RemoveAt(products.Count() - 1);

			// Format lists into query statements
			int fullCount = products[0].Count();
			result += PrepareOutput(fullCount, "Product", products, new bool[] { true, false, true, true, false, false });
			result += PrepareOutput(count, "Event", events, new bool[] { true, true, true, true, true });
			result += PrepareOutputTags("ProductToTag", productTags, startProductID);
			result += PrepareOutput(fullCount, "ProductToEvent", productsToEvents, new bool[] { false, false });
			result += PrepareOutput(fullCount, "SellerToEvent", sellerToEvents, new bool[] { false, false });

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
			List<List<string>> userTags = CustomGenerator.GetTags(count);

			// Format lists into query statements
			result += PrepareOutput(count, "Address", addresses, new bool[] { true, true, false, true });
			result += PrepareOutput(count, "User", users, new bool[] { false, true, true, true, true, true });
			result += PrepareOutputTags("UserToTag", userTags, startUserID);

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
						id = (int)command.ExecuteScalar();
						id++;
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
	}
}
