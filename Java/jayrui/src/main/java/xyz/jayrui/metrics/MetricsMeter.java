package xyz.jayrui.metrics;

import java.util.Random;
import java.util.concurrent.TimeUnit;

import com.codahale.metrics.ConsoleReporter;
import com.codahale.metrics.Meter;
import com.codahale.metrics.MetricRegistry;

/**
 * Description: 度量速率。。<br>
 * <p>
 * Date: 2017-03-13
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class MetricsMeter {
    public static Random random = new Random();

    public static void request(Meter meter){
        System.out.println("request....");
        meter.mark();
    }

    public static void request(Meter meter,int n){
        while(n > 0){
            request(meter);
            n--;
        }
    }

    public static void main(String[] args) throws InterruptedException {
        MetricRegistry registry = new MetricRegistry();
        ConsoleReporter reporter = ConsoleReporter.forRegistry(registry).build();

        reporter.start(1, TimeUnit.SECONDS);
        Meter tps = registry.meter(MetricRegistry.name(MetricsMeter.class,"tps","rate"));
        for(;;){
            request(tps,random.nextInt(10));
            Thread.sleep(1000);
        }


    }
}
