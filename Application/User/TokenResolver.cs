using Domain;
using AutoMapper;
using Microsoft.Extensions.Configuration;
using System;
using API.Security;

namespace Application.User
{
    public class TokenResolver<T, D> : IValueResolver<T, D, string>
    {
        private readonly IJwtTokenGenerator _jwtTokenGenerator;
        private readonly IConfiguration _configuration;

        public TokenResolver(IJwtTokenGenerator jwtTokenGenerator, IConfiguration configuration)
        {
            _jwtTokenGenerator = jwtTokenGenerator;
            _configuration = configuration;
        }

        public string Resolve(T source, D destination, string destMember, ResolutionContext context)
        {
            if (source is Seller)
            {
                Seller user = source as Seller;
                return _jwtTokenGenerator.GenerateToken(user.AppUser.Id,
                        _configuration.GetSection("AppSettings:TokenKey").Value);
            }

            if (source is Domain.Buyer)
            {
                Domain.Buyer user = source as Domain.Buyer;
                return _jwtTokenGenerator.GenerateToken(user.AppUser.Id,
                        _configuration.GetSection("AppSettings:TokenKey").Value);
            }

            throw new Exception("Problem generating token");
        }
    }
}
