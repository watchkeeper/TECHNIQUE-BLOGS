package xyz.jayrui.metrics.frame;

import java.util.UUID;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class EventStreamImpl implements EventStream {
    @Override
    public void consume(EventConsumer consumer) {
        for (;;) {
            consumer.consume(new Event(1, UUID.randomUUID()));
        }
    }
}
