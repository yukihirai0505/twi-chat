package http.routes

import akka.http.scaladsl.server.Directives._
import de.heikoseeberger.akkahttpcirce.CirceSupport
import http.SecurityDirectives
import services.{AuthService, ChatService}

import scala.concurrent.ExecutionContext

class ChatServiceRoute(
                        val authService: AuthService,
                        chatService: ChatService
                      )(implicit executionContext: ExecutionContext) extends CirceSupport with SecurityDirectives {

  def route =
    get {
      path("chat") {
        parameter('name) { name ⇒
          handleWebSocketMessages(chatService.webSocketChatFlow(sender = name))
        }
      }
    }
}
