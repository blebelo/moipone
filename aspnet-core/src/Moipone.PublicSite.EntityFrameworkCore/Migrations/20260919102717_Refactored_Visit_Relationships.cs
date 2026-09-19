using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Moipone.PublicSite.Migrations
{
    /// <inheritdoc />
    public partial class Refactored_Visit_Relationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visits_AttendanceRegisters_AttendanceRegisterId",
                table: "Visits");

            migrationBuilder.AlterColumn<int>(
                name: "AttendanceRegisterId",
                table: "Visits",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Visits_AttendanceRegisters_AttendanceRegisterId",
                table: "Visits",
                column: "AttendanceRegisterId",
                principalTable: "AttendanceRegisters",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visits_AttendanceRegisters_AttendanceRegisterId",
                table: "Visits");

            migrationBuilder.AlterColumn<int>(
                name: "AttendanceRegisterId",
                table: "Visits",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Visits_AttendanceRegisters_AttendanceRegisterId",
                table: "Visits",
                column: "AttendanceRegisterId",
                principalTable: "AttendanceRegisters",
                principalColumn: "Id");
        }
    }
}
