﻿using System;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
namespace Persistence
{
    public class Datacontext : IdentityDbContext<AppUser>
    {
        public Datacontext(DbContextOptions options) : base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<UserActivity> UserActivities { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> Followings { get; set; }


        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // bir kaç değer girmek için builder oluşturuyoruz
            builder.Entity<Value>().HasData(
                new Value { Id = 1, Name = "Value 101" },
                    new Value { Id = 2, Name = "Value 102" },
                        new Value { Id = 3, Name = "Value 103" }

            );

            builder.Entity<UserActivity>(x => x.HasKey(ua =>
                    new { ua.AppUserId, ua.ActivityId, }));

            builder.Entity<UserActivity>()
                    .HasOne(u => u.AppUser)
                    .WithMany(a => a.UserActivities)
                    .HasForeignKey(u => u.AppUserId); // 1 aktivitive  many app user aynı zamanda 1 user pekçok aktiveteye dahil olabilir
            builder.Entity<UserActivity>()
                    .HasOne(a => a.Activity)
                    .WithMany(u => u.UserActivities)
                    .HasForeignKey(a => a.ActivityId);

            builder.Entity<UserFollowing>(b =>
            {
                b.HasKey(k => new { k.ObserverId, k.TargetId });

                b.HasOne(o => o.Observer)
                    .WithMany(f => f.Followings)
                    .HasForeignKey(o => o.ObserverId)
                    .OnDelete(DeleteBehavior.Restrict);
                b.HasOne(o => o.Target)
                       .WithMany(f => f.Followers)
                       .HasForeignKey(o => o.TargetId)
                       .OnDelete(DeleteBehavior.Restrict);
            });

        }
    }
}
