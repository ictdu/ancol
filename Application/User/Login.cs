using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MediatR;


namespace Application.User
{
    public class Login
    {
        public class Query : IRequest<UserDto>
        {

        }

        public class Handler : IRequestHandler<Query, UserDto>
        {

            public async Task<UserDto> Handle(Query request, CancellationToken cancellationToken)
            {
                return new UserDto()
                {
                    Firstname = "test",
                    Lastname = "test ln",
                    Username = "test uname"
                };
            }
        }
    }

}
