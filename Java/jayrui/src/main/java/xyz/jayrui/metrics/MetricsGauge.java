package xyz.jayrui.metrics;

import java.util.LinkedList;
import java.util.Queue;
import java.util.concurrent.TimeUnit;

import com.codahale.metrics.ConsoleReporter;
import com.codahale.metrics.Gauge;
import com.codahale.metrics.MetricRegistry;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-13
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class MetricsGauge {
    public static Queue<String> quene = new LinkedList<>();

    public static void main(String[] args) throws InterruptedException {
        MetricRegistry registry = new MetricRegistry();
        ConsoleReporter reporter = ConsoleReporter.forRegistry(registry).build();

        reporter.start(1, TimeUnit.SECONDS);
        registry.register(MetricRegistry.name(MetricsGauge.class, "quene", "size"),
                (Gauge<Integer>) () -> quene.size());

        for(;;){
            Thread.sleep(1000);
            quene.add("Job-jay");
        }
    }
}
