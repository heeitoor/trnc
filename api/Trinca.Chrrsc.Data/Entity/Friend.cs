using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trinca.Chrrsc.Data.Entity
{
    [Table("friend")]
    public class Friend
    {
        [Column("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("name")]
        [Required(AllowEmptyStrings = false)]
        [MaxLength(40)]
        public string Name { get; set; }

        public virtual ICollection<Party> Parties { get; set; }
    }
}
