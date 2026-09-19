using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Moipone.PublicSite.Migrations
{
    /// <inheritdoc />
    public partial class Added_Attendance_Indexes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Week",
                table: "AttendanceRegisters");

            migrationBuilder.AlterColumn<string>(
                name: "Surname",
                table: "Visitors",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Visitors",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "Visitors",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "ContactNumber",
                table: "Visitors",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsClosed",
                table: "AttendanceRegisters",
                type: "boolean",
                nullable: false,
                defaultValue: false);

            migrationBuilder.CreateIndex(
                name: "IX_Visitors_ContactNumber",
                table: "Visitors",
                column: "ContactNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Visitors_EmailAddress",
                table: "Visitors",
                column: "EmailAddress",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_AttendanceRegisters_Date",
                table: "AttendanceRegisters",
                column: "Date",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Visitors_ContactNumber",
                table: "Visitors");

            migrationBuilder.DropIndex(
                name: "IX_Visitors_EmailAddress",
                table: "Visitors");

            migrationBuilder.DropIndex(
                name: "IX_AttendanceRegisters_Date",
                table: "AttendanceRegisters");

            migrationBuilder.DropColumn(
                name: "IsClosed",
                table: "AttendanceRegisters");

            migrationBuilder.AlterColumn<string>(
                name: "Surname",
                table: "Visitors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Visitors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "EmailAddress",
                table: "Visitors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "ContactNumber",
                table: "Visitors",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddColumn<int>(
                name: "Week",
                table: "AttendanceRegisters",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
