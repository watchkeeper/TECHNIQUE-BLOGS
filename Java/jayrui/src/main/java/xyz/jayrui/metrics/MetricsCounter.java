package xyz.jayrui.metrics;

import java.util.Queue;
import java.util.Random;
import java.util.concurrent.LinkedBlockingDeque;
import java.util.concurrent.TimeUnit;

import com.codahale.metrics.ConsoleReporter;
import com.codahale.metrics.Counter;
import com.codahale.metrics.MetricRegistry;

/**
 * Description: 在获取队列等大小时比gauge高效<br>
 * <p>
 * Date: 2017-03-13
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class MetricsCounter {
    public static Queue<String> quene = new LinkedBlockingDeque<>();

    public static Counter jobs;

    public static Random random = new Random();

    public static void addJob(String job){
        jobs.inc();
        quene.offer(job);
    }

    public static String takeJob(){
        jobs.dec();
        return quene.poll();
    }

    public static void main(String[] args) throws InterruptedException {
        MetricRegistry registry = new MetricRegistry();
        ConsoleReporter reporter = ConsoleReporter.forRegistry(registry).build();

        reporter.start(1, TimeUnit.SECONDS);
        jobs = registry.counter(MetricRegistry.name(MetricsCounter.class,"jobs","size"));

        int num  = 1;
        for(;;){
            Thread.sleep(200);
            if(random.nextDouble() > 0.7){
                String job = takeJob();
                System.out.println("take job : " + job);
            }else{
                String job = "Job-" + num++;
                addJob(job);
                System.out.println("add job : " + job);
            }
        }
    }
}
