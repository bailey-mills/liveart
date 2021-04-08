using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
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
			//List<string> previewURLs = new List<string>();
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
				//previewURLs = previewURLs.Concat(GetImageURL(currCount, null)).ToList();
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
			//items.Add(previewURLs);
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
			List<string> titles = GetRowsByCategoryID(count, categoryIDs, Database.DB_SAMPLES, "EventName", "Value");
			List<string> summaries = new List<string>();
			for (int j = 0; j < count; j++)
			{
				summaries.Add("Summary of the event here");
			}
			List<string> startTimes = GetDates(count, DateTime.Today.AddDays(-30), 50, 9, 20);
			List<string> endTimes = GetDatesFromReference(count, startTimes, 10, 120);
			List<string> thumbnails = GetRowsByCategoryID(count, categoryIDs, Database.DB_SAMPLES, "ProductImages", "Value");

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
			List<string> passwords = GetPasswords(count, usernames);
			List<string> birthdays = GetBirthday(count);
			List<string> profileImages = GetRepeat(count, "https://t4.ftcdn.net/jpg/04/10/43/77/360_F_410437733_hdq4Q3QOH9uwh0mcqAhRFzOKfrCR24Ta.jpg");

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
			items.Add(profileImages);

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

		public static List<string> GetPasswords(int count, List<string> usernames)
		{
			List<string> items = new List<string>();

			for (int i = 0; i < count; i++)
			{
				string password = usernames[i];
				byte[] secret = Encoding.ASCII.GetBytes(ConfigurationManager.AppSettings["SECRET"]);
				// Create a SHA256   
				using (HMACSHA256 sha256Hash = new HMACSHA256(secret))
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
			// 1950-2000
			List<string> items = new List<string>();

			DateTime start = new DateTime(1950, 1, 1);
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

		public static List<string> GetRowsByCategoryID(int count, List<string> categoryIDs, string database, string table, string column)
		{
			List<string> items = new List<string>();

			// Get all images in groups
			List<List<string>> itemGroups = new List<List<string>>();
			for (int i = 0; i < 4; i++)
			{
				List<string> itemsInCategory = new List<string>();

				string query = string.Format("SELECT {0} FROM [{1}] WHERE CategoryID = {2}", column, table, i + 1);
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
								string url = reader["Value"].ToString();
								itemsInCategory.Add(url);
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

				itemGroups.Add(itemsInCategory);
			}
			Random r = new Random();

			// Choose a random item for each categoryID
			for (int i = 0; i < count; i++)
			{
				int categoryID = int.Parse(categoryIDs[i]);
				List<string> itemGroup = itemGroups[categoryID - 1];
				int index = r.Next(0, itemGroup.Count);
				string item = itemGroup[index];
				items.Add(item);
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
