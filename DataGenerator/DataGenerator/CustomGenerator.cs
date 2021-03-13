using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataGenerator
{
	class CustomGenerator
	{
		public static List<string> GetMethods()
		{
			List<string> methods = new List<string>();

			methods.Add("GetNumber");
			methods.Add("GetPostalCode");
			methods.Add("GetEmail");
			methods.Add("GetPassword");
			methods.Add("GetBirthday");
			methods.Add("GetDate");
			methods.Add("GetImageURL");

			return methods;
		}

		public static List<string> GetNumber(int count)
		{
			List<string> items = new List<string>();
			Random r = new Random();

			for (int i = 0; i < count; i++)
			{
				int num = r.Next(1, 1000);
				items.Add(num.ToString());
			}

			return items;
		}

		public static List<List<string>> GetAddresses(int count)
		{
			List<List<string>> items = Database.GetRows(count, Database.DB_SAMPLES, "Address", new string[] { "StreetAddress", "City", "ProvinceID", "PostalCode" });

			return items;
		}

		public static List<List<string>> GetUsers(int count, int startAddressID)
		{
			List<List<string>> items = new List<List<string>>();

			// Get sample data
			List<string> firstNames = Database.GetRows(count, Database.DB_SAMPLES, "FirstName", "Value", Database.FORMAT_NUMBER);
			List<string> lastNames = Database.GetRows(count, Database.DB_SAMPLES, "LastName", "Value", Database.FORMAT_NUMBER);
			List<string> emails = GetEmails(count, firstNames, lastNames);
			List<string> passwords = GetPasswords(count, firstNames, lastNames);
			List<string> birthdays = GetBirthday(count);

			// Address ID
			List<string> addressIDs = new List<string>();
			for (int i = 0; i < count; i++)
			{
				int id = i + startAddressID;
				addressIDs.Add(id.ToString());
			}

			// Add items to the list of data
			items.Add(emails);
			items.Add(passwords);
			items.Add(addressIDs);
			items.Add(firstNames);
			items.Add(lastNames);
			items.Add(birthdays);

			return items;
		}

		public static List<List<string>> GetTags(int count)
		{
			List<List<string>> items = new List<List<string>>();

			// Get sample data
			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				List<string> tagGroup = Database.GetRows(r.Next(1, 3), Database.DB_MAIN, "Tag", "ID", Database.FORMAT_NUMBER);
				items.Add(tagGroup);
			}

			return items;
		}

		public static List<string> GetEmails(int count, List<string> firstNames, List<string> lastNames)
		{
			List<string> items = new List<string>();

			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				// Example: bailey_mills_123@hotmail.com
				string email = string.Format("{0}_{1}_{2}@hotmail.com ", firstNames[i], lastNames[i], r.Next(1, 100));
				items.Add(email);
			}

			return items;
		}

		public static List<string> GetPasswords(int count, List<string> firstNames, List<string> lastNames)
		{
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{
				string password = firstNames[i] + lastNames[i];
				items.Add(password);
			}

			return items;
		}

		public static List<string> GetBirthday(int count)
		{
			// 1960-2000
			List<string> items = new List<string>();

			DateTime start = new DateTime(1960, 1, 1);
			DateTime end = new DateTime(2000, 1, 1);
			int range = (end - start).Days;

			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				string date = start.AddDays(r.Next(range)).ToShortDateString();
				items.Add(date);
			}

			return items;
		}

		public static List<string> GetDate(int count)
		{
			// start / end range?
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{

			}

			return items;
		}

		public static List<string> GetImageURL(int count)
		{
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{

			}

			return items;
		}

		public static List<string> GetRepeat(int count, string str)
		{
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{
				items.Add(str);
			}

			return items;
		}
	}
}
