package http

import akka.http.scaladsl.server.Directives._
import http.routes.{AuthServiceRoute, ChatServiceRoute, UsersServiceRoute}
import services.{AuthService, ChatService, UsersService}
import utils.CorsSupport

import scala.concurrent.ExecutionContext

class HttpService(usersService: UsersService,
                  authService: AuthService,
                  chatService: ChatService
                 )(implicit executionContext: ExecutionContext) extends CorsSupport {

  val usersRouter = new UsersServiceRoute(authService, usersService)
  val authRouter = new AuthServiceRoute(authService)
  val chatRouter = new ChatServiceRoute(authService, chatService)

  val routes =
    pathPrefix("v1") {
      corsHandler {
        usersRouter.route ~
          authRouter.route ~
          chatRouter.route
      }
    }

}
