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
			this.label2 = new System.Windows.Forms.Label();
			this.comboTable = new System.Windows.Forms.ComboBox();
			this.btnPreview = new System.Windows.Forms.Button();
			this.btnOutput = new System.Windows.Forms.Button();
			this.txtPreview = new System.Windows.Forms.RichTextBox();
			this.label4 = new System.Windows.Forms.Label();
			this.numCount = new System.Windows.Forms.NumericUpDown();
			((System.ComponentModel.ISupportInitialize)(this.dgvInput)).BeginInit();
			((System.ComponentModel.ISupportInitialize)(this.numCount)).BeginInit();
			this.SuspendLayout();
			// 
			// label1
			// 
			this.label1.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
			this.label1.Font = new System.Drawing.Font("Microsoft Sans Serif", 15.75F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.label1.Location = new System.Drawing.Point(12, 16);
			this.label1.Name = "label1";
			this.label1.Size = new System.Drawing.Size(436, 25);
			this.label1.TabIndex = 0;
			this.label1.Text = "LIVE.art Data Generator";
			this.label1.TextAlign = System.Drawing.ContentAlignment.MiddleCenter;
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
			this.comboDatabase.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
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
			this.dgvInput.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
			this.dgvInput.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
			this.dgvInput.EditMode = System.Windows.Forms.DataGridViewEditMode.EditOnEnter;
			this.dgvInput.Location = new System.Drawing.Point(12, 113);
			this.dgvInput.Name = "dgvInput";
			this.dgvInput.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.CellSelect;
			this.dgvInput.Size = new System.Drawing.Size(436, 111);
			this.dgvInput.TabIndex = 4;
			this.dgvInput.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.DgvInput_CellClick);
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
			// btnPreview
			// 
			this.btnPreview.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
			this.btnPreview.Location = new System.Drawing.Point(12, 513);
			this.btnPreview.Name = "btnPreview";
			this.btnPreview.Size = new System.Drawing.Size(436, 23);
			this.btnPreview.TabIndex = 8;
			this.btnPreview.Text = "Preview";
			this.btnPreview.UseVisualStyleBackColor = true;
			this.btnPreview.Click += new System.EventHandler(this.BtnPreview_Click);
			// 
			// btnOutput
			// 
			this.btnOutput.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
			this.btnOutput.Location = new System.Drawing.Point(12, 542);
			this.btnOutput.Name = "btnOutput";
			this.btnOutput.Size = new System.Drawing.Size(436, 23);
			this.btnOutput.TabIndex = 9;
			this.btnOutput.Text = "Output";
			this.btnOutput.UseVisualStyleBackColor = true;
			this.btnOutput.Click += new System.EventHandler(this.BtnOutput_Click);
			// 
			// txtPreview
			// 
			this.txtPreview.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
			this.txtPreview.BackColor = System.Drawing.Color.White;
			this.txtPreview.Font = new System.Drawing.Font("Consolas", 8.25F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
			this.txtPreview.Location = new System.Drawing.Point(12, 230);
			this.txtPreview.Name = "txtPreview";
			this.txtPreview.ReadOnly = true;
			this.txtPreview.Size = new System.Drawing.Size(436, 272);
			this.txtPreview.TabIndex = 10;
			this.txtPreview.Text = "";
			// 
			// label4
			// 
			this.label4.AutoSize = true;
			this.label4.Location = new System.Drawing.Point(209, 84);
			this.label4.Name = "label4";
			this.label4.Size = new System.Drawing.Size(35, 13);
			this.label4.TabIndex = 12;
			this.label4.Text = "Count";
			// 
			// numCount
			// 
			this.numCount.Location = new System.Drawing.Point(250, 81);
			this.numCount.Maximum = new decimal(new int[] {
            1000000,
            0,
            0,
            0});
			this.numCount.Minimum = new decimal(new int[] {
            1,
            0,
            0,
            0});
			this.numCount.Name = "numCount";
			this.numCount.Size = new System.Drawing.Size(77, 20);
			this.numCount.TabIndex = 13;
			this.numCount.Value = new decimal(new int[] {
            5,
            0,
            0,
            0});
			// 
			// frmDataGenerator
			// 
			this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
			this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
			this.ClientSize = new System.Drawing.Size(460, 574);
			this.Controls.Add(this.numCount);
			this.Controls.Add(this.label4);
			this.Controls.Add(this.txtPreview);
			this.Controls.Add(this.btnOutput);
			this.Controls.Add(this.btnPreview);
			this.Controls.Add(this.comboTable);
			this.Controls.Add(this.label2);
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
			((System.ComponentModel.ISupportInitialize)(this.numCount)).EndInit();
			this.ResumeLayout(false);
			this.PerformLayout();

		}

		#endregion

		private System.Windows.Forms.Label label1;
		private System.Windows.Forms.Label label3;
		private System.Windows.Forms.ComboBox comboDatabase;
		private System.Windows.Forms.DataGridView dgvInput;
		private System.Windows.Forms.Label label2;
		private System.Windows.Forms.ComboBox comboTable;
		private System.Windows.Forms.Button btnPreview;
		private System.Windows.Forms.Button btnOutput;
		private System.Windows.Forms.RichTextBox txtPreview;
		private System.Windows.Forms.Label label4;
		private System.Windows.Forms.NumericUpDown numCount;
	}
}

