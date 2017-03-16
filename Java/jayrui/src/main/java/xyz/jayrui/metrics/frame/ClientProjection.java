package xyz.jayrui.metrics.frame;

import java.time.Duration;
import java.time.Instant;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class ClientProjection implements EventConsumer {
    private final ProjectionMetrics metrics;

    public ClientProjection(ProjectionMetrics metrics){
        this.metrics = metrics;
    }

    @Override
    public Event consume(Event event) {
        Sleeper.randSleep(10,1);
        metrics.latency(Duration.between(event.getCreated(), Instant.now()));
//        Sleeper.randSleep(10,1);
        return event;
    }
}
