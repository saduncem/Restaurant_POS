using System;

namespace APOS.Shared.Extensions
{
    public static class DateTimeExtensions
    {
        /// <summary>
        /// Converts UTC DateTime to local time based on Istanbul timezone.
        /// </summary>
        public static DateTime ToIstanbulTime(this DateTime utcDateTime)
        {
            var istanbulTimeZone = TimeZoneInfo.FindSystemTimeZoneById("Turkey Standard Time");
            return TimeZoneInfo.ConvertTimeFromUtc(utcDateTime, istanbulTimeZone);
        }

        /// <summary>
        /// Formats the DateTime as dd/MM/yyyy HH:mm string.
        /// </summary>
        public static string ToReadableString(this DateTime dateTime)
        {
            return dateTime.ToString("dd/MM/yyyy HH:mm");
        }
    }
}
