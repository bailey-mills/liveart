using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Configuration;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace DataGenerator
{
	public partial class frmDataGenerator : Form
	{
		public frmDataGenerator()
		{
			InitializeComponent();
			SetupDatabaseComboBox();
			SetupTableComboBox();
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

		private void BtnRefresh_Click(object sender, EventArgs e)
		{

		}

		private void ComboDatabase_SelectedIndexChanged(object sender, EventArgs e)
		{
			SetupTableComboBox();
		}

		private void ComboTable_SelectedIndexChanged(object sender, EventArgs e)
		{
			Database.SetupTable(dgvInput, comboDatabase.SelectedItem.ToString(), comboTable.SelectedItem.ToString());
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
			}
		}
	}
}
