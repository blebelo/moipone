
using System;
using System.Collections;
using System.Collections.Generic;
using System.Data;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using TPDF;
using TPDF.MailMerge;

namespace Moipone.PublicSite.Documents
{
    public class PdfGenerator : IPdfGenerator
    {
        public Task<byte[]> GenerateAsync<TModel>(byte[] documentTemplate, TModel model)
        {
            ArgumentNullException.ThrowIfNull(documentTemplate);
            ArgumentNullException.ThrowIfNull(model);

            if (documentTemplate.Length == 0)
            {
                throw new ArgumentException(
                    "Document template cannot be empty.",
                    nameof(documentTemplate));
            }

            var data = BuildMergeData(model);

            using var templateStream =
                new MemoryStream(documentTemplate);

            using var mergedStream = new MemoryStream();

            Tpdf.MergeMailMergeTemplate(
                templateStream,
                mergedStream,
                data);

            var mergedDocument = mergedStream.ToArray();
            var pdf = Tpdf.ConvertDocxToPdf(mergedDocument);

            return Task.FromResult(pdf);
        }

        private static MailMergeData BuildMergeData<TModel>(TModel model)
        {
            var fields =
                new Dictionary<string, MailMergeValue>(
                    StringComparer.OrdinalIgnoreCase);

            var regions =
                new Dictionary<
                    string,
                    IReadOnlyList<
                        IReadOnlyDictionary<string, MailMergeValue>>>(
                    StringComparer.OrdinalIgnoreCase);

            foreach (var property in GetReadableProperties(
                         model!.GetType()))
            {
                var value = property.GetValue(model);

                if (value is DataTable table)
                {
                    regions[property.Name] = BuildRows(table);
                }
                else if (value is DataSet dataSet)
                {
                    foreach (DataTable dataTable in dataSet.Tables)
                    {
                        regions[dataTable.TableName] =
                            BuildRows(dataTable);
                    }
                }
                else if (value is IEnumerable collection &&
                         value is not string &&
                         value is not byte[])
                {
                    regions[property.Name] =
                        BuildRows(collection);
                }
                else
                {
                    fields[property.Name] =
                        new MailMergeValue.Text(
                            FormatValue(value));
                }
            }

            return new MailMergeData(
                Fields: fields,
                Regions: regions);
        }

        private static IEnumerable<PropertyInfo> GetReadableProperties(Type type)
        {
            return type.GetProperties(
                    BindingFlags.Public |
                    BindingFlags.Instance)
                .Where(property =>
                    property.CanRead &&
                    property.GetIndexParameters().Length == 0);
        }

        private static IReadOnlyList<IReadOnlyDictionary<string, MailMergeValue>> BuildRows(IEnumerable collection)
        {
            var rows =
                new List<IReadOnlyDictionary<string, MailMergeValue>>();

            foreach (var item in collection)
            {
                if (item is null)
                {
                    continue;
                }

                if (item is DataRow dataRow)
                {
                    rows.Add(dataRow.Table.Columns
                        .Cast<DataColumn>()
                        .ToDictionary(
                            column => column.ColumnName,
                            column => (MailMergeValue)
                                new MailMergeValue.Text(
                                    FormatValue(
                                        dataRow[column] is DBNull
                                            ? null
                                            : dataRow[column])),
                            StringComparer.OrdinalIgnoreCase));

                    continue;
                }

                var row =
                    new Dictionary<string, MailMergeValue>(
                        StringComparer.OrdinalIgnoreCase);

                foreach (var property in GetReadableProperties(
                             item.GetType()))
                {
                    row[property.Name] =
                        new MailMergeValue.Text(
                            FormatValue(property.GetValue(item)));
                }

                rows.Add(row);
            }

            return rows;
        }

        private static IReadOnlyList<IReadOnlyDictionary<string, MailMergeValue>> BuildRows(DataTable table)
        {
            return BuildRows((IEnumerable)table.Rows);
        }

        private static string FormatValue(object? value)
        {
            if (value is null || value is DBNull)
            {
                return string.Empty;
            }

            if (value is bool boolean)
            {
                return boolean ? "Yes" : "No";
            }

            if (value is DateTime dateTime)
            {
                return dateTime.ToString(
                    "dd/MM/yyyy",
                    CultureInfo.InvariantCulture);
            }

            if (value is DateOnly dateOnly)
            {
                return dateOnly.ToString(
                    "dd/MM/yyyy",
                    CultureInfo.InvariantCulture);
            }

            if (value is Enum)
            {
                return value.ToString()!;
            }

            return Convert.ToString(
                value,
                CultureInfo.InvariantCulture) ?? string.Empty;
        }
    }
}
