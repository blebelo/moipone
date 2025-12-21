using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Moipone.PublicSite.Migrations
{
    /// <inheritdoc />
    public partial class Employee_Entity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Employees",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    LastName = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: false),
                    Age = table.Column<int>(type: "integer", nullable: false),
                    Gender = table.Column<int>(type: "integer", nullable: false),
                    PersonalEmail = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    EmployeeEmail = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    IdNumber = table.Column<string>(type: "character varying(13)", maxLength: 13, nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "date", nullable: false),
                    PhoneNumber = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: false),
                    AddressId = table.Column<Guid>(type: "uuid", nullable: true),
                    HireDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: true),
                    Position = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Department = table.Column<int>(type: "integer", nullable: false),
                    EmploymentStatus = table.Column<int>(type: "integer", nullable: false),
                    Salary = table.Column<decimal>(type: "numeric(18,2)", nullable: true),
                    EmployeeNumber = table.Column<string>(type: "character varying(50)", maxLength: 50, nullable: true),
                    EmergencyContactName = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: true),
                    EmergencyContactPhone = table.Column<string>(type: "character varying(20)", maxLength: 20, nullable: true),
                    EmergencyContactRelationship = table.Column<int>(type: "integer", maxLength: 50, nullable: false),
                    CertifiedId = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    ProofOfResidence = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CurriculumVitae = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    CertifiedHighestQualification = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: false),
                    PoliceeClearance = table.Column<string>(type: "character varying(255)", maxLength: 255, nullable: true),
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
                    table.PrimaryKey("PK_Employees", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Employees_Addresses_AddressId",
                        column: x => x.AddressId,
                        principalTable: "Addresses",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Employees_AddressId",
                table: "Employees",
                column: "AddressId");

            migrationBuilder.CreateIndex(
                name: "IX_Employees_EmployeeEmail",
                table: "Employees",
                column: "EmployeeEmail",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_IdNumber",
                table: "Employees",
                column: "IdNumber",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Employees_PersonalEmail",
                table: "Employees",
                column: "PersonalEmail",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Employees");
        }
    }
}
