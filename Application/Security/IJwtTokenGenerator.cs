using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Security
{
    public interface IJwtTokenGenerator
    {
        string GenerateToken(string userId, string tokenKey);
    }
}
