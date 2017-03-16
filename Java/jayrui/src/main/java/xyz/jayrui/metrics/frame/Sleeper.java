package xyz.jayrui.metrics.frame;

import java.util.Random;
import java.util.concurrent.TimeUnit;

/**
 * Description: <br>
 * <p>
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
public class Sleeper {
    private static final Random RANDOM = new Random();

    public static void randSleep(double mean,double stdDev){
        final double micros = 1_000 * (mean + RANDOM.nextGaussian() * stdDev);

        try {
            TimeUnit.MICROSECONDS.sleep((long)micros);
        }catch (InterruptedException e){
            throw new RuntimeException(e);
        }
    }
}
