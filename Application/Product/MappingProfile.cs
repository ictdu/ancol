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
            CreateMap<Domain.Product, ProductDto>();
        }
    }
}
