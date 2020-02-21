package hengda.billboard;

import io.grpc.Server;
import io.grpc.ServerBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;

public class BizService {
    private static final Logger logger = LoggerFactory.getLogger(BizService.class);

    private Server server;

    private void start() throws IOException {
        int port = 5001;
        server = ServerBuilder.forPort(port)
                .addService(new DemoServiceImpl())
                .addService(new UserServiceImpl())
                .addService(new ResumeServiceImpl())
                .addService(new RecruitmentServiceImpl())
                .addService(new FavoriteServiceImpl())
                .addService(new JournalServiceImpl())
                .addService(new DeliveryServiceImpl())
                .addService(new FeedbackServiceImpl())
                .addService(new ReportServiceImpl())
                .addService(new EnterpriseServiceImpl())
                .build()
                .start();
        logger.info("服务启动于端口 " + port);
        Runtime.getRuntime().addShutdownHook(new Thread() {
            @Override
            public void run() {
                System.err.println("*** shutting down gRPC server since JVM is shutting down");
                BizService.this.stop();
                System.err.println("*** server shut down");
            }
        });
    }

    private void stop() {
        if (server != null) {
            server.shutdown();
        }
    }

    private void blockUntilShutdown() throws InterruptedException {
        if (server != null) {
            server.awaitTermination();
        }
    }

    public static void main(String[] args) throws IOException, InterruptedException {
        final BizService server = new BizService();
        server.start();
        server.blockUntilShutdown();
    }
}