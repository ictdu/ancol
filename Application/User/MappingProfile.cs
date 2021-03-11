using API.Security;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.User
{
    public class MappingProfile : AutoMapper.Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Seller, SellerDto>()
                .ForMember(m => m.Email, m => m.MapFrom(s => s.AppUser.Email))
                .ForMember(m => m.UserName, m => m.MapFrom(s => s.AppUser.UserName))
                .ForMember(m => m.Firstname, m => m.MapFrom(s => s.AppUser.Firstname))
                .ForMember(m => m.Lastname, m => m.MapFrom(s => s.AppUser.Lastname))

                .ForMember(m => m.Token, m => m.MapFrom<TokenResolver<Domain.Seller, SellerDto>>());


            CreateMap<Domain.Buyer, BuyerDto>()
                .ForMember(m => m.Email, m => m.MapFrom(s => s.AppUser.Email))
                .ForMember(m => m.UserName, m => m.MapFrom(s => s.AppUser.UserName))
                .ForMember(m => m.Firstname, m => m.MapFrom(s => s.AppUser.Firstname))
                .ForMember(m => m.Lastname, m => m.MapFrom(s => s.AppUser.Lastname))

                .ForMember(m => m.Token, m => m.MapFrom<TokenResolver<Domain.Buyer, BuyerDto>>());
        }
    }
}
