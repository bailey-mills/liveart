using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Configuration;
using System.Windows.Forms;

namespace DataGenerator
{
	class Database
	{
		public static string DB_NONE = "N/A";
		public static string DB_NULL = "NULL";
		public static string DB_EMPTY = "Empty string";
		public static string DB_CUSTOM = "Custom";

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
			string getQuery = "USE " + database + "; SELECT TOP 0 * FROM " + table;

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
				string query = "dbo.GetRows";
				List<string> currResults = new List<string>();
				
				if (col.valid)
				{
					if (!col.runQuery)
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
						using (SqlConnection conn = new SqlConnection(ConfigurationManager.ConnectionStrings[col.database].ConnectionString))
						{
							try
							{
								using (var command = new SqlCommand(query, conn))
								{
									conn.Open();
									command.CommandType = CommandType.StoredProcedure;
									command.Parameters.Add(new SqlParameter("@Requests", count));
									command.Parameters.Add(new SqlParameter("@SampleRows", GetSampleRows(col.database, col.table)));
									command.Parameters.Add(new SqlParameter("@Table", col.table));
									command.Parameters.Add(new SqlParameter("@Column", col.column));

									SqlDataReader reader = command.ExecuteReader();
									while (reader.Read())
									{
										string curr = reader[col.column].ToString();
										if (col.format == "String")
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

			// Loop through all requested rows and format them into queries
			string output = "USE " + database + ";\n";
			if (valid)
			{
				for (int i = 0; i < count; i++)
				{
					string line = string.Format("INSERT INTO {0} VALUES (", table);
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

		private static int GetSampleRows(string database, string table)
		{
			int count = -1;

			string query = "USE [" + database + "]; SELECT COUNT(*) FROM " + table;

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
	}
}
