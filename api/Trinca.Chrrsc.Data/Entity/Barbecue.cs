using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trinca.Chrrsc.Data.Entity
{
    [Table("barbecue")]
    public class Barbecue
    {
        [Column("id")]
        public int Id { get; set; }

        [Column("why")]
        [Required(AllowEmptyStrings = false)]
        [MaxLength(50)]
        public string Why { get; set; }

        [Column("description")]
        [MaxLength(250)]
        public string Description { get; set; }

        [Column("when")]
        [Required]
        public DateTime When { get; set; }

        public virtual ICollection<Party> Parties { get; set; }
    }
}
