using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Product
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<Domain.Product, ProductDto>()
                .ForMember(m => m.SellerName, x => 
                x.MapFrom(x =>  $"{x.Seller.AppUser.Firstname} {x.Seller.AppUser.Lastname}"));
        }
    }
}
