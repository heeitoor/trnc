using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trinca.Chrrsc.Data.Entity
{
    [Table("settings")]
    public class Settings
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("key")]
        [Required(AllowEmptyStrings = false)]
        [MaxLength(20)]
        public string Key { get; set; }

        [Column("value")]
        [Required(AllowEmptyStrings = false)]
        [MaxLength(20)]
        public string Value { get; set; }
    }
}
