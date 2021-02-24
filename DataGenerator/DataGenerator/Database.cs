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
		static string DB_NONE = "N/A";
		static string DB_NULL = "NULL";
		static string DB_EMPTY = "Empty string";

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
				dgv.Columns.Add(combo);
			}

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

			items.Add("N/A");
			items.Add("NULL");
			items.Add("Empty string");

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

			if (database != DB_NONE && database != DB_NULL && database != DB_EMPTY)
			{
				tables = GetTables(database);
			}

			return tables;
		}
	}
}
