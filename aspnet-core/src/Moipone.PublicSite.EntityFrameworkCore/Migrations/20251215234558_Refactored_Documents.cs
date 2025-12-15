using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Moipone.PublicSite.Migrations
{
    /// <inheritdoc />
    public partial class Refactored_Documents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Addresses_ResidentialAddressId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CertifiedHighestQualification",
                table: "CourseApplications");

            migrationBuilder.DropColumn(
                name: "CertifiedId",
                table: "CourseApplications");

            migrationBuilder.DropColumn(
                name: "CurriculumVitae",
                table: "CourseApplications");

            migrationBuilder.DropColumn(
                name: "ProofOfResidence",
                table: "CourseApplications");

            migrationBuilder.AlterColumn<Guid>(
                name: "ResidentialAddressId",
                table: "Students",
                type: "uuid",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uuid");

            migrationBuilder.AddColumn<string>(
                name: "CertifiedHighestQualification",
                table: "Students",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CertifiedId",
                table: "Students",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CurriculumVitae",
                table: "Students",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProofOfResidence",
                table: "Students",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Addresses_ResidentialAddressId",
                table: "Students",
                column: "ResidentialAddressId",
                principalTable: "Addresses",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Students_Addresses_ResidentialAddressId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CertifiedHighestQualification",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CertifiedId",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "CurriculumVitae",
                table: "Students");

            migrationBuilder.DropColumn(
                name: "ProofOfResidence",
                table: "Students");

            migrationBuilder.AlterColumn<Guid>(
                name: "ResidentialAddressId",
                table: "Students",
                type: "uuid",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uuid",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CertifiedHighestQualification",
                table: "CourseApplications",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CertifiedId",
                table: "CourseApplications",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CurriculumVitae",
                table: "CourseApplications",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ProofOfResidence",
                table: "CourseApplications",
                type: "character varying(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Students_Addresses_ResidentialAddressId",
                table: "Students",
                column: "ResidentialAddressId",
                principalTable: "Addresses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
