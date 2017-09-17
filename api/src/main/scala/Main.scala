import akka.actor.ActorSystem
import akka.event.{Logging, LoggingAdapter}
import akka.http.scaladsl.Http
import akka.stream.ActorMaterializer
import http.HttpService
import services.{AuthService, UsersService}
import utils.{Config, DatabaseService, FlywayService}

import scala.concurrent.ExecutionContext
import scala.util.{Failure, Success}

/**
  * author Yuki Hirai on 2017/06/27.
  */
object Main extends App with Config {
  implicit val actorSystem = ActorSystem()
  implicit val executor: ExecutionContext = actorSystem.dispatcher
  implicit val log: LoggingAdapter = Logging(actorSystem, getClass)
  implicit val materializer: ActorMaterializer = ActorMaterializer()

  val flywayService = new FlywayService(jdbcUrl, dbUser, dbPassword)
  flywayService.migrateDatabaseSchema()

  val databaseService = new DatabaseService(jdbcUrl, dbUser, dbPassword)

  val usersService = new UsersService(databaseService)
  val authService = new AuthService(databaseService)(usersService)

  val httpService = new HttpService(usersService, authService)

  val binding = Http().bindAndHandle(httpService.routes, httpHost, httpPort)
  binding.onComplete {
    case Success(_binding) ⇒
      val localAddress = _binding.localAddress
      println(s"Server is listening on ${localAddress.getHostName}:${localAddress.getPort}")
    case Failure(e) ⇒
      println(s"Binding failed with ${e.getMessage}")
      actorSystem.terminate()
  }
}
