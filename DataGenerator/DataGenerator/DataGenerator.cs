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
	public partial class frmDataGenerator : Form
	{
		const int MIN_WIDTH = 476;

		public frmDataGenerator()
		{
			InitializeComponent();
			SetupDatabaseComboBox();
			SetupTableComboBox();
			ResizeWindow();
		}

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

		private void ComboDatabase_SelectedIndexChanged(object sender, EventArgs e)
		{
			SetupTableComboBox();
			ResizeWindow();
		}

		private void ComboTable_SelectedIndexChanged(object sender, EventArgs e)
		{
			Database.SetupTable(dgvInput, comboDatabase.SelectedItem.ToString(), comboTable.SelectedItem.ToString());
			ResizeWindow();
		}

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
					combo.DataSource = new string[] { "String", "Number" };
				}
			}
		}

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

		private void BtnPreview_Click(object sender, EventArgs e)
		{
			string result = Database.GenerateQuery(dgvInput, 10, comboDatabase.Text, comboTable.Text);
			if (result != null)
			{
				txtPreview.Text = result;
			}
		}

		private void BtnOutput_Click(object sender, EventArgs e)
		{
			string result = Database.GenerateQuery(dgvInput, Int32.Parse(numCount.Value.ToString()), comboDatabase.Text, comboTable.Text);
			
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
	}
}
