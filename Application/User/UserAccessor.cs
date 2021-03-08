using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace Application.User
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpContext;

        public UserAccessor(IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
        }

        public string GetCurrentUserId()
        {
            return _httpContext.HttpContext.User?.Claims?.SingleOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?
                   .Value;
        }
    }
}
