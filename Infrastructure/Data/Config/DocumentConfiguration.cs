using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Data.Config;

public class DocumentConfiguration : IEntityTypeConfiguration<Document>
{
    public void Configure(EntityTypeBuilder<Document> builder)
    {
        builder.Property(document => document.Id).IsRequired();
        builder.Property(document => document.Name).IsRequired().HasMaxLength(60);
        builder.Property(document => document.Content).IsRequired();
        builder.Property(document => document.Size).IsRequired();
        builder.Property(document => document.UploadTime).IsRequired();
    }
}