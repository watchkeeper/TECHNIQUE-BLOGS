package xyz.jayrui.metrics.frame;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

import com.codahale.metrics.ConsoleReporter;
import com.codahale.metrics.Histogram;
import com.codahale.metrics.MetricRegistry;

import lombok.extern.slf4j.Slf4j;

/**
 * Description: 度量任务的时间变化曲线<br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Slf4j
public class ProjectionMetrics {
    private final Histogram latencyHist;

    public ProjectionMetrics(MetricRegistry registry){
        final ConsoleReporter reporter = ConsoleReporter.forRegistry(registry)
                .convertRatesTo(TimeUnit.SECONDS)
                .convertDurationsTo(TimeUnit.MILLISECONDS)
                .build();

        reporter.start(1,TimeUnit.SECONDS);
        latencyHist = registry.histogram(MetricRegistry.name(ProjectionMetrics.class,"latency"));
    }

    /**
     * 程序执行时等待的时间
     * @param duration
     */
    public void latency(Duration duration){
        latencyHist.update(duration.toMillis());
    }
}
