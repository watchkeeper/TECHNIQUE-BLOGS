package xyz.jayrui.metrics.frame;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
@FunctionalInterface
public interface EventConsumer {
    Event consume(Event event);
}
