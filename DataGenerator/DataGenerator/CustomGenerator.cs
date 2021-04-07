using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;

namespace DataGenerator
{
	class CustomGenerator
	{
		public static List<string> GetMethods()
		{
			List<string> methods = new List<string>();

			/*
			methods.Add("GetNumber");
			methods.Add("GetPostalCode");
			methods.Add("GetEmail");
			methods.Add("GetPassword");
			methods.Add("GetBirthday");
			methods.Add("GetDate");
			methods.Add("GetImageURL");
			*/

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

		public static List<List<string>> GetProducts(int count, List<string> randomSellers, int startEventID, int startProductID)
		{
			List<List<string>> items = new List<List<string>>();

			List<string> names = new List<string>();
			List<string> sellerIDs = new List<string>();
			List<string> descriptions = new List<string>();
			List<string> previewURLs = new List<string>();
			List<string> basePrices = new List<string>();
			List<string> isSold = new List<string>();
			List<string> tempEventID = new List<string>();
			List<string> tempProductID = new List<string>();

			int productID = startProductID;

			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				int currCount = r.Next(1, 4);
				names = names.Concat(Database.GetRows(currCount, Database.DB_SAMPLES, "ProductName", "Value", Database.FORMAT_NUMBER)).ToList();
				previewURLs = previewURLs.Concat(GetImageURL(currCount)).ToList();
				basePrices = basePrices.Concat(GetNumber(currCount)).ToList();

				// IsSold (all not sold)
				for (int j = 0; j < currCount; j++)
				{
					isSold.Add("0");
				}

				// Descriptions
				for (int j = 0; j < currCount; j++)
				{
					descriptions.Add("Description of the artwork here");
				}

				// Add a seller ID for each product from the list of sellerIDs chosen
				for (int j = 0; j < currCount; j++)
				{
					sellerIDs.Add(randomSellers[i]);
				}

				// Maintain eventID
				for (int j = 0; j < currCount; j++)
				{
					tempEventID.Add((startEventID + i).ToString());
					tempProductID.Add(productID.ToString());
					productID++;
				}
			}

			items.Add(names);
			items.Add(sellerIDs);
			items.Add(descriptions);
			items.Add(previewURLs);
			items.Add(basePrices);
			items.Add(isSold);
			items.Add(tempEventID);
			items.Add(tempProductID);

			return items;
		}

		public static List<List<string>> GetEvents(int count, List<string> categoryIDs)
		{
			List<List<string>> items = new List<List<string>>();

			// Get sample data
			List<string> titles = Database.GetRows(count, Database.DB_SAMPLES, "EventName", "Value", Database.FORMAT_NUMBER);
			List<string> summaries = new List<string>();
			for (int j = 0; j < count; j++)
			{
				summaries.Add("Summary of the event here");
			}
			List<string> startTimes = GetDates(count, DateTime.Today.AddDays(-30), 50, 9, 20);
			List<string> endTimes = GetDatesFromReference(count, startTimes, 10, 120);
			List<string> thumbnails = GetImageURL(count);

			// Add items to the list of data
			items.Add(titles);
			items.Add(summaries);
			items.Add(startTimes);
			items.Add(endTimes);
			items.Add(thumbnails);
			items.Add(categoryIDs);

			return items;
		}

		public static List<List<string>> GetUsers(int count, int startAddressID)
		{
			List<List<string>> items = new List<List<string>>();

			// Get sample data
			List<string> firstNames = Database.GetRows(count, Database.DB_SAMPLES, "FirstName", "Value", Database.FORMAT_NUMBER);
			List<string> lastNames = Database.GetRows(count, Database.DB_SAMPLES, "LastName", "Value", Database.FORMAT_NUMBER);
			List<string> usernames = GetUsernames(count, firstNames, lastNames);
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
			items.Add(addressIDs);
			items.Add(emails);
			items.Add(passwords);
			//items.Add(firstNames);
			//items.Add(lastNames);
			items.Add(usernames);
			items.Add(birthdays);

			return items;
		}

		public static List<List<string>> GetTags(int count, int tagCount, List<string> categoryID)
		{
			List<List<string>> items = new List<List<string>>();

			// Get sample data
			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				List<string> tagGroup = Database.GetRows(r.Next(1, tagCount), Database.DB_MAIN, "Tag", new string[] { "ID" }, string.Format("WHERE CategoryID = {0}", categoryID[i]))[0];
				items.Add(tagGroup);
			}

			return items;
		}

		public static List<string> GetUsernames(int count, List<string> firstNames, List<string> lastNames)
		{
			List<string> items = new List<string>();

			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				// Example: Bailey_Mills_123
				string username = string.Format("{0}_{1}_{2}", firstNames[i], lastNames[i], r.Next(1, 1000));
				items.Add(username);
			}

			return items;
		}

		public static List<string> GetEmails(int count, List<string> usernames)
		{
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{
				// Example: bailey_mills_123@hotmail.com
				string email = string.Format("{0}@hotmail.com", usernames[i]);
				items.Add(email);
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
				string email = string.Format("{0}_{1}_{2}@hotmail.com", firstNames[i], lastNames[i], r.Next(1, 100));
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
				// Create a SHA256   
				using (SHA256 sha256Hash = SHA256.Create())
				{
					// ComputeHash - returns byte array  
					byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

					// Convert byte array to a string   
					StringBuilder builder = new StringBuilder();
					for (int j = 0; j < bytes.Length; j++)
					{
						builder.Append(bytes[j].ToString("x2"));
					}
					password = builder.ToString();
				}
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

		public static List<string> GetDates(int count, DateTime startDate, int rangeInDays, int minStartHour, int maxStartHour)
		{
			List<string> items = new List<string>();

			Random r = new Random();
			for (int i = 0; i < count; i++)
			{
				DateTime date = startDate.AddDays(r.Next(rangeInDays));
				date = date.AddHours(r.Next(minStartHour, maxStartHour));
				string strDate = date.ToString();
				items.Add(strDate);
			}

			return items;
		}

		public static List<string> GetDatesFromReference(int count, List<string> startDates, int minMinutes, int maxMinutes)
		{
			List<string> items = new List<string>();

			Random r = new Random();
			foreach (string rawDate in startDates)
			{
				DateTime date = DateTime.Parse(rawDate);
				date = date.AddMinutes(r.Next(minMinutes, maxMinutes));
				items.Add(date.ToString());
			}

			return items;
		}

		public static List<string> GetImageURL(int count)
		{
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{
				items.Add("/image.png");
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
