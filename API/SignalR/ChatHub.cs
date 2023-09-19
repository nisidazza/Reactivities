using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;

        }

        public async Task SendComment(Create.Command command)
        {
            var comment = await _mediator.Send(command); // sending body and activity Id
            //3. every time a comment is sent to a group, they are going to receive it based on this method "ReceiveComment" 
            await Clients.Group(command.ActivityId.ToString())
            .SendAsync("ReceiveComment", comment.Value); // the name of this method needs to be used in the client side
        }

        //when a user connects to the Hub, we want them to join a group
        public override async Task OnConnectedAsync()
        {
            //get activity Id from the query string, we don't have route parameters
            var httpContext = Context.GetHttpContext();
            //1. when a client connects, we join them to a group with the name of the activityId
            //NB: SignalR automatically remove any connections IDs from those groups they belong to
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            
            //2. we send to them a list of comments that we get from the db
            var result = await _mediator.Send(new List.Query { ActivityId = Guid.Parse(activityId) });
            await Clients.Caller.SendAsync("LoadComments", result.Value);
        }
    }
}