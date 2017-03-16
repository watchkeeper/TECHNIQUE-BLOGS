package xyz.jayrui.metrics.frame;

import com.codahale.metrics.MetricRegistry;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class Example {
    public static void main(String [] args){
        MetricRegistry registry = new MetricRegistry();
        ProjectionMetrics metrics = new ProjectionMetrics(registry);
        ClientProjection projection = new ClientProjection(metrics);

        NaivePool pool = new NaivePool(10,projection);
        EventStream es = new EventStreamImpl();
        es.consume(pool);
    }
}
