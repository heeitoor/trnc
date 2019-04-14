using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Trinca.Chrrsc.Data.Entity
{
    [Table("party")]
    public class Party
    {
        [Column("id")]
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        [Column("barbecueid")]
        [Required]
        public int BarbecueId { get; set; }

        [Column("friendid")]
        [Required]
        public int FriendId { get; set; }

        [Column("value")]
        [Required]
        public decimal Value { get; set; }

        [Column("paid")]
        [Required]
        public bool Paid { get; set; }

        [Column("fun")]
        [Required]
        public bool Fun { get; set; }

        public virtual Friend Friend { get; set; }

        public virtual Barbecue Barbecue { get; set; }
    }
}
