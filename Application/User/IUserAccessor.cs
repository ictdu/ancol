using System;
using System.Collections.Generic;
using System.Text;

namespace Application.User
{
    public interface IUserAccessor
    {
        string GetCurrentUserId();
    }
}
