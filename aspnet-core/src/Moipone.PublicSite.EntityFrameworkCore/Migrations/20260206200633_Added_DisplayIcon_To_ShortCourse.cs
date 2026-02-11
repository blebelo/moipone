using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Moipone.PublicSite.Migrations
{
    /// <inheritdoc />
    public partial class Added_DisplayIcon_To_ShortCourse : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "DisplayIcon",
                table: "ShortCourses",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DisplayIcon",
                table: "ShortCourses");
        }
    }
}
