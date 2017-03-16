package xyz.jayrui.metrics.frame;

import java.time.Instant;
import java.util.UUID;

import lombok.Value;

/**
 * Date: 2017-03-10
 *
 * @author: huangrui
 * @Version: 1.0
 */
@Value
public class Event {
    private final Instant created = Instant.now();

    private final int clientId;

    private final UUID uuid;

    private final String idStr = "12";

    private final float idFloat = 12f;

    private final char idChar = 'a';


}
