namespace DataGenerator
{
	partial class frmDataGenerator
	{
		/// <summary>
		/// Required designer variable.
		/// </summary>
		private System.ComponentModel.IContainer components = null;

		/// <summary>
		/// Clean up any resources being used.
		/// </summary>
		/// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
		protected override void Dispose(bool disposing)
		{
			if (disposing && (components != null))
			{
				components.Dispose();
			}
			base.Dispose(disposing);
		}

		#region Windows Form Designer generated code

		/// <summary>
		/// Required method for Designer support - do not modify
		/// the contents of this method with the code editor.
		/// </summary>
		private void InitializeComponent()
		{
			this.label1 = new System.Windows.Forms.Label();
			this.label3 = new System.Windows.Forms.Label();
			this.comboDatabase = new System.Windows.Forms.ComboBox();
			this.dgvInput = new System.Windows.Forms.DataGridView();
			this.btnRefresh = new System.Windows.Forms.Button();
			this.label2 = new System.Windows.Forms.Label();
			this.comboTable = new System.Windows.Forms.ComboBox();
			this.dgvSample = new System.Windows.Forms.DataGridView();
			((System.ComponentModel.ISupportInitialize)(this.dgvInput)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.dgvSample)).BeginInit();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.AutoSize = true;
			this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.Location = new System.Drawing.Point(109, 16);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(241, 25);
			this.label1.TabIndex = 0;
			this.label1.Text = "LIVE.art Data Generator";
			// 
			// label3
			// 
			this.label3.AutoSize = true;
			this.label3.Location = new System.Drawing.Point(12, 56);
			this.label3.Name = "label3";
			this.label3.Size = new System.Drawing.Size(53, 13);
			this.label3.TabIndex = 2;
			this.label3.Text = "Database";
			// 
			// comboDatabase
			// 
			this.comboDatabase.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
			this.comboDatabase.FormattingEnabled = true;
			this.comboDatabase.Location = new System.Drawing.Point(71, 53);
			this.comboDatabase.Name = "comboDatabase";
			this.comboDatabase.Size = new System.Drawing.Size(377, 21);
			this.comboDatabase.TabIndex = 3;
			this.comboDatabase.SelectedIndexChanged += new System.EventHandler(this.ComboDatabase_SelectedIndexChanged);
			// 
			// dgvInput
			// 
			this.dgvInput.AllowUserToAddRows = false;
			this.dgvInput.AllowUserToDeleteRows = false;
			this.dgvInput.AllowUserToResizeColumns = false;
			this.dgvInput.AllowUserToResizeRows = false;
			this.dgvInput.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvInput.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnEnter;
			this.dgvInput.Location = new System.Drawing.Point(12, 113);
			this.dgvInput.Name = "dgvInput";
			this.dgvInput.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
			this.dgvInput.Size = new System.Drawing.Size(436, 117);
			this.dgvInput.TabIndex = 4;
			this.dgvInput.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.DgvInput_CellClick);
			// 
			// btnRefresh
			// 
			this.btnRefresh.Location = new System.Drawing.Point(192, 236);
			this.btnRefresh.Name = "btnRefresh";
			this.btnRefresh.Size = new System.Drawing.Size(75, 23);
			this.btnRefresh.TabIndex = 5;
			this.btnRefresh.Text = "Refresh";
			this.btnRefresh.UseVisualStyleBackColor = true;
			this.btnRefresh.Click += new System.EventHandler(this.BtnRefresh_Click);
			// 
			// label2
			// 
			this.label2.AutoSize = true;
			this.label2.Location = new System.Drawing.Point(31, 83);
			this.label2.Name = "label2";
			this.label2.Size = new System.Drawing.Size(34, 13);
			this.label2.TabIndex = 6;
			this.label2.Text = "Table";
			// 
			// comboTable
			// 
			this.comboTable.DropDownStyle = System.Windows.Forms.ComboBoxStyle.DropDownList;
			this.comboTable.FormattingEnabled = true;
			this.comboTable.Location = new System.Drawing.Point(71, 80);
			this.comboTable.Name = "comboTable";
			this.comboTable.Size = new System.Drawing.Size(121, 21);
			this.comboTable.TabIndex = 7;
			this.comboTable.SelectedIndexChanged += new System.EventHandler(this.ComboTable_SelectedIndexChanged);
			// 
			// dgvSample
			// 
			this.dgvSample.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvSample.Location = new System.Drawing.Point(12, 265);
			this.dgvSample.Name = "dgvSample";
			this.dgvSample.Size = new System.Drawing.Size(436, 60);
			this.dgvSample.TabIndex = 8;
			// 
			// frmDataGenerator
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(460, 384);
			this.Controls.Add(this.dgvSample);
			this.Controls.Add(this.comboTable);
			this.Controls.Add(this.label2);
			this.Controls.Add(this.btnRefresh);
			this.Controls.Add(this.dgvInput);
			this.Controls.Add(this.comboDatabase);
			this.Controls.Add(this.label3);
			this.Controls.Add(this.label1);
			this.FormBorderStyle = System.Windows.Forms.FormBorderStyle.FixedSingle;
			this.MaximizeBox = false;
			this.Name = "frmDataGenerator";
			this.StartPosition = System.Windows.Forms.FormStartPosition.CenterScreen;
			this.Text = "Data Generator";
			((System.ComponentModel.ISupportInitialize)(this.dgvInput)).EndInit();
			((System.ComponentModel.ISupportInitialize)(this.dgvSample)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.ComboBox comboDatabase;
		private System.Windows.Forms.DataGridView dgvInput;
		private System.Windows.Forms.Button btnRefresh;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.ComboBox comboTable;
		private System.Windows.Forms.DataGridView dgvSample;
	}
}

