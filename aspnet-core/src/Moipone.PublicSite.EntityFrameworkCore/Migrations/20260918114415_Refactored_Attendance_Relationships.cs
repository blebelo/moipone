using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Moipone.PublicSite.Migrations
{
    /// <inheritdoc />
    public partial class Refactored_Attendance_Relationships : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WardNumber",
                table: "Visits");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "Visits",
                newName: "CheckOutDate");

            migrationBuilder.AddColumn<int>(
                name: "AttendanceRegisterId",
                table: "Visits",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "CheckInDate",
                table: "Visits",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "OtherReason",
                table: "Visits",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "WardNumber",
                table: "Visitors",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "AttendanceRegisters",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Week = table.Column<int>(type: "integer", nullable: false),
                    CreationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    CreatorUserId = table.Column<long>(type: "bigint", nullable: true),
                    LastModificationTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true),
                    LastModifierUserId = table.Column<long>(type: "bigint", nullable: true),
                    IsDeleted = table.Column<bool>(type: "boolean", nullable: false),
                    DeleterUserId = table.Column<long>(type: "bigint", nullable: true),
                    DeletionTime = table.Column<DateTime>(type: "timestamp with time zone", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AttendanceRegisters", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Visits_AttendanceRegisterId",
                table: "Visits",
                column: "AttendanceRegisterId");

            migrationBuilder.AddForeignKey(
                name: "FK_Visits_AttendanceRegisters_AttendanceRegisterId",
                table: "Visits",
                column: "AttendanceRegisterId",
                principalTable: "AttendanceRegisters",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Visits_AttendanceRegisters_AttendanceRegisterId",
                table: "Visits");

            migrationBuilder.DropTable(
                name: "AttendanceRegisters");

            migrationBuilder.DropIndex(
                name: "IX_Visits_AttendanceRegisterId",
                table: "Visits");

            migrationBuilder.DropColumn(
                name: "AttendanceRegisterId",
                table: "Visits");

            migrationBuilder.DropColumn(
                name: "CheckInDate",
                table: "Visits");

            migrationBuilder.DropColumn(
                name: "OtherReason",
                table: "Visits");

            migrationBuilder.DropColumn(
                name: "WardNumber",
                table: "Visitors");

            migrationBuilder.RenameColumn(
                name: "CheckOutDate",
                table: "Visits",
                newName: "Date");

            migrationBuilder.AddColumn<int>(
                name: "WardNumber",
                table: "Visits",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
