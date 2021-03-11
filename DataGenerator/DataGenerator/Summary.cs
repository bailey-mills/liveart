using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DataGenerator
{
	class Summary
	{
		public string database;
		public string table;
		public string column;
		public string format;

		public bool includeValue = true;
		public bool valid = true;
		public bool runQuery = true;

		public Summary(string database, string table, string column, string format)
		{
			if (database == Database.DB_NONE)
			{
				includeValue = false;
				runQuery = false;
			}
			else if (database == Database.DB_NULL)
			{
				this.column = "NULL";
				runQuery = false;
			}
			else if (database == Database.DB_EMPTY)
			{
				this.column = "''";
				runQuery = false;
			}
			else if (database == Database.DB_CUSTOM)
			{
				CustomGenerator cg = new CustomGenerator();
				MethodInfo method = cg.GetType().GetMethod(table);
				this.column = method.Invoke(cg, null).ToString();
				runQuery = false;
			}
			else if (database != "" && table != "" && column != "")
			{
				this.database = database;
				this.table = table;
				this.column = column;
				this.valid = true;
				this.format = format;
			}
			else
			{
				valid = false;
			}
		}
	}
}
