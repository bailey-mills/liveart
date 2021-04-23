using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DataGenerator
{
	/**
		\brief The input form the user can modify/interact with to generate SQL statements for sample data. At the current time, 
		the datagridview input system is not needed. For now, the system uses the User/Event/Subscriber/Button to generate all 
		of the data the application uses for testing/display purposes.
	*/
	public partial class frmDataGenerator : Form
	{
		const int MIN_WIDTH = 900;

		public static string TYPE_CUSTOM = "custom";
		public static string TYPE_USER = "user";
		public static string TYPE_EVENT = "event";
		public static string TYPE_SUBSCRIBER = "subscriber";
		public static string TYPE_BID = "bid";
		string outputType = TYPE_CUSTOM;

		/**
			\brief Initializes all content on the form.
		*/
		public frmDataGenerator()
		{
			InitializeComponent();
			SetupDatabaseComboBox();
			SetupTableComboBox();
			ResizeWindow();
		}

		/**
			\brief Sets up the combo boxes for database choices based on the connection string config file.
		*/
		private void SetupDatabaseComboBox()
		{
			var connectionStrings = ConfigurationManager.ConnectionStrings;

			foreach (ConnectionStringSettings connectionString in connectionStrings)
			{
				comboDatabase.Items.Add(connectionString.Name);
			}

			comboDatabase.Items.RemoveAt(0);

			comboDatabase.SelectedIndex = 0;
		}

		/**
			\brief Sets up the combo boxes for tables choices based on the first item in the database combobox.
		*/
		private void SetupTableComboBox()
		{
			List<string> tables = Database.GetTables(comboDatabase.SelectedItem.ToString());

			comboTable.Items.Clear();
			foreach (string table in tables)
			{
				comboTable.Items.Add(table);
			}

			comboTable.SelectedIndex = 0;
		}

		/**
			\brief Update list of tables when database is updated.
		*/
		private void ComboDatabase_SelectedIndexChanged(object sender, EventArgs e)
		{
			SetupTableComboBox();
			ResizeWindow();
		}

		/**
			\brief Update the datagridview when the table selection is changed.
		*/
		private void ComboTable_SelectedIndexChanged(object sender, EventArgs e)
		{
			Database.SetupTable(dgvInput, comboDatabase.SelectedItem.ToString(), comboTable.SelectedItem.ToString());
			ResizeWindow();
		}

		/**
			\brief Update DGV as needed when a cell is updated.
		*/
		private void DgvInput_CellClick(object sender, DataGridViewCellEventArgs e)
		{
			if (e.ColumnIndex >= 0 && e.RowIndex >= 0)
			{
				DataGridViewComboBoxCell combo = this.dgvInput[e.ColumnIndex, e.RowIndex] as DataGridViewComboBoxCell;

				// Source Database
				if (e.RowIndex == 0)
				{
					combo.DataSource = Database.GetSourceDatabases();

					// Update the combo boxes below
					dgvInput.Rows[1].Cells[e.ColumnIndex].Value = null;
					dgvInput.Rows[2].Cells[e.ColumnIndex].Value = null;
				}

				// Source Table
				if (e.RowIndex == 1)
				{
					var rawDatabase = dgvInput.Rows[0].Cells[e.ColumnIndex].Value;
					if (rawDatabase != null)
					{
						string database = rawDatabase.ToString();
						combo.DataSource = Database.GetSourceTables(database);

						// Update the combo box below
						dgvInput.Rows[2].Cells[e.ColumnIndex].Value = null;
					}
				}

				// Source Column
				if (e.RowIndex == 2)
				{
					var rawDatabase = dgvInput.Rows[0].Cells[e.ColumnIndex].Value;
					var rawTable = dgvInput.Rows[1].Cells[e.ColumnIndex].Value;

					if (rawDatabase != null && rawTable != null)
					{
						string database = rawDatabase.ToString();
						string table = rawTable.ToString();
						combo.DataSource = Database.GetColumns(database, table);
					}
				}

				// DataType Column
				if (e.RowIndex == 3)
				{
					combo.DataSource = new string[] { Database.FORMAT_STRING, Database.FORMAT_NUMBER };
				}
			}
		}

		/**
			\brief Resize the window to fit the new dgv size.
		*/
		private void ResizeWindow()
		{
			// Calculate the width of the window
			int width = dgvInput.Columns.Count * Database.COL_WIDTH + 3;

			// Ensure it is above max
			if (width < MIN_WIDTH)
			{
				width = MIN_WIDTH;
			}

			// Set width to requetsed value
			this.Width = width + 40;
		}

		/**
			\brief Update the text box with the results from the current selection of data the user has put in.
		*/
		private void BtnPreview_Click(object sender, EventArgs e)
		{
			string result = GetOutput(5);
			if (result != null)
			{
				txtPreview.Text = result;
			}
		}

		/**
			\brief Generate SQL statements based on user input and prepare to save the file as a SQL file.
		*/
		private void BtnOutput_Click(object sender, EventArgs e)
		{
			string result = GetOutput(Int32.Parse(numCount.Value.ToString()));
			
			if (result != null)
			{
				// Choose path
				SaveFileDialog sfd = new SaveFileDialog
				{
					InitialDirectory = @"C:\",
					Title = "Save script",

					DefaultExt = "sql",
					Filter = "SQL Files (*.sql)|*.sql",
					FilterIndex = 2
				};

				if (sfd.ShowDialog() == DialogResult.OK)
				{
					string path = sfd.FileName;
					File.WriteAllText(path, result);
				}
			}
		}

		/**
			\param count The number the user has inputted into the combo box.
			\brief Handles how to direct user input, and how much data should be generated and displayed/saved as a sql file.
		*/
		private string GetOutput(int count)
		{
			string result = "";

			if (outputType == TYPE_USER)
			{
				result = Database.GenerateUsers(count, comboDatabase.Text);
			}
			else if (outputType == TYPE_EVENT)
			{
				result = Database.GenerateEvents(count, comboDatabase.Text);
			}
			else if (outputType == TYPE_SUBSCRIBER)
			{
				result = Database.GenerateSubscribers(count, comboDatabase.Text);
			}
			else if (outputType == TYPE_BID)
			{
				result = Database.GenerateBids(count, comboDatabase.Text);
			}
			else
			{
				result = Database.GenerateQuery(dgvInput, count, comboDatabase.Text, comboTable.Text);
			}

			return result;
		}

		/**
			\brief Update UI to reflect 'Custom' generation selection.
		*/
		private void BtnCustom_Click(object sender, EventArgs e)
		{
			btnCustom.Enabled = false;
			btnUser.Enabled = true;
			btnEvent.Enabled = true;
			btnSubscriber.Enabled = true;
			btnBid.Enabled = true;

			dgvInput.Enabled = true;

			outputType = TYPE_CUSTOM;

			lblNote.Text = "";
		}

		/**
			\brief Update UI to reflect 'User' generation selection.
		*/
		private void BtnUser_Click(object sender, EventArgs e)
		{
			btnCustom.Enabled = true;
			btnUser.Enabled = false;
			btnEvent.Enabled = true;
			btnSubscriber.Enabled = true;
			btnBid.Enabled = true;

			dgvInput.Enabled = false;

			outputType = TYPE_USER;

			lblNote.Text = "";
		}

		/**
			\brief Update UI to reflect 'Event' generation selection.
		*/
		private void BtnEvent_Click(object sender, EventArgs e)
		{
			btnCustom.Enabled = true;
			btnUser.Enabled = true;
			btnEvent.Enabled = false;
			btnSubscriber.Enabled = true;
			btnBid.Enabled = true;

			dgvInput.Enabled = false;

			outputType = TYPE_EVENT;
			lblNote.Text = "";
		}

		/**
			\brief Update UI to reflect 'Subscriber' generation selection.
		*/
		private void BtnSubscriber_Click(object sender, EventArgs e)
		{
			btnCustom.Enabled = true;
			btnUser.Enabled = true;
			btnEvent.Enabled = true;
			btnSubscriber.Enabled = false;
			btnBid.Enabled = true;

			dgvInput.Enabled = false;

			outputType = TYPE_SUBSCRIBER;

			lblNote.Text = "IMPORTANT: Very slow. Test out in preview mode first (uses 5 count each time)";
		}

		/**
			\brief Update UI to reflect 'Bid' generation selection.
		*/
		private void BtnBid_Click(object sender, EventArgs e)
		{
			btnCustom.Enabled = true;
			btnUser.Enabled = true;
			btnEvent.Enabled = true;
			btnSubscriber.Enabled = true;
			btnBid.Enabled = false;

			dgvInput.Enabled = false;

			outputType = TYPE_BID;

			lblNote.Text = "IMPORTANT: Only generate bids/transactions if there are no bids/transactions already";
		}
	}
}
