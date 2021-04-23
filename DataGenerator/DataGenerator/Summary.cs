using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace DataGenerator
{
	/**
		\brief Class used to contain all necessary information from the forms datagridview the user inputted (for the un-used custom generator).
	*/
	class Summary
	{
		public string database;
		public string table;
		public string column;
		public string format;

		public bool includeValue = true;
		public bool valid = true;
		public bool runQuery = true;
		public bool customQuery = false;

		/**
			\param database DB to use.
			\param table Table to use.
			\param format Format of the data (number or string).
			\brief Set up the Summary object as needed. Decides how based on the incoming database choice. This is now not used in the data generator for LIVE.ART.
		*/
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
				this.table = table;
				customQuery = true;
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
