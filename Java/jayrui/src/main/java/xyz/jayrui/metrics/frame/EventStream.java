package xyz.jayrui.metrics.frame;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
public interface EventStream {
    void consume(EventConsumer consumer);
}
