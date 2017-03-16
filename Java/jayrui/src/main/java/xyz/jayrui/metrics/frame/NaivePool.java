package xyz.jayrui.metrics.frame;

import java.io.Closeable;
import java.io.IOException;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import com.codahale.metrics.Gauge;
import com.codahale.metrics.MetricRegistry;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class NaivePool implements EventConsumer,Closeable {

    private final EventConsumer consumer;

    private final ExecutorService es;

    public NaivePool(int size,EventConsumer consumer){
        this.consumer = consumer;
        this.es = Executors.newFixedThreadPool(size);
    }

    public NaivePool(int size, EventConsumer consumer, MetricRegistry registry){
        BlockingQueue<Runnable> queue = new LinkedBlockingDeque<>();

        registry.register(MetricRegistry.name(ProjectionMetrics.class, "queue", "size"), (Gauge<Integer>) queue::size);

        this.consumer = consumer;
        es = new ThreadPoolExecutor(size,size,0L, TimeUnit.MILLISECONDS,queue);
    }

    @Override
    public Event consume(Event event) {
        es.submit(() -> consumer.consume(event));

        return event;
    }

    @Override
    public void close() throws IOException {
        es.shutdown();
    }
}