using System;
using System.Collections.Generic;
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

		public static string GetNumber()
		{
			Random r = new Random();
			int num = r.Next(0, 1000);
			return num.ToString();
		}

		public static string GetPostalCode()
		{
			string value = "-POSTAL CODE-";
			return value;
		}

		public static string GetEmail()
		{
			string value = "-EMAIL-";
			return value;
		}

		public static string GetPassword()
		{
			string value = "-PASSWORD-";
			return value;
		}

		public static string GetBirthday()
		{
			// 1960-2000
			string value = "-BIRTHDAY-";
			return value;
		}

		public static string GetDate()
		{
			// start / end range?
			string value = "-DATE-";
			return value;
		}

		public static string GetImageURL()
		{
			string value = "-URL-";
			return value;
		}
	}
}
